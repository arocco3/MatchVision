import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Team } from '../../Models/Team';
import { TeamsService } from '../../services/teamsService';
import { NewTeamModalComponent } from './newTeamModal/newTeamModal.component';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/globalService';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    RouterModule,
    NewTeamModalComponent,
    CommonModule,
    FormsModule
],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent implements OnInit {

    constructor(private teamsService: TeamsService, public globalService: GlobalService){}

    @ViewChild(NewTeamModalComponent) newTeamModal!: NewTeamModalComponent;

    searchText: string = '';

    // to delete teams
    showDeleteButtons = false;

    // To get all teams
    ngOnInit(): void {
        this.globalService.loadTeams();
    }

    openNewTeamModal(): void{
        this.newTeamModal.open();
    }

    toggleDeleteMode() {
        this.showDeleteButtons = !this.showDeleteButtons;
    }

      // To delete a specific player
    deleteTeam(id: any){
        this.teamsService.deleteTeam(id).subscribe({
        next: () => {
            console.log('Team eliminato')
            this.globalService.loadTeams()
        },
        error: (err) => console.error('Errore eliminazione team', err)
        })
    }

    // To filter teams
    get filteredTeams(): Team[] {
        if (!this.searchText) return this.globalService.allTeams();
        return this.globalService.allTeams().filter(t =>
            t.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
}

}
