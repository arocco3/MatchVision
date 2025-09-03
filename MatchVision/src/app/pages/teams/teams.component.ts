import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Team } from '../../Models/Team';
import { TeamsService } from '../../services/teamsService';
import { NewTeamModalComponent } from './newTeamModal/newTeamModal.component';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

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

  @ViewChild(NewTeamModalComponent) newTeamModal!: NewTeamModalComponent;

  teams: Team[] = [];
  searchText: string = '';

  // to delete teams
  showDeleteButtons = false;

  constructor(private teamsService: TeamsService, private cdr: ChangeDetectorRef){}

  // To get all teams
    ngOnInit(): void {
        this.loadTeams();
    }

    loadTeams() {
        this.teamsService.getTeams().subscribe({
        next: (data) => {
            console.log(data);
            this.teams = data;
            this.cdr.detectChanges(); // Forces data refresh
            },
            error: (err) => console.error('Errore caricamento teams', err)
        });
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
            this.loadTeams()
        },
        error: (err) => console.error('Errore eliminazione team', err)
        })
    }

  // To filter teams
    get filteredTeams(): Team[] {
        if (!this.searchText) return this.teams;
        return this.teams.filter(t =>
            t.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
}

}
