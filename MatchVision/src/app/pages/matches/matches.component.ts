import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatchesService } from '../../services/matchesService'
import { NewMatchModalComponent } from './newMatchModal/newMatchModal.component';
import { Match } from '../../Models/Match';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [
    RouterModule,
    NewMatchModalComponent,
    CommonModule,
    FormsModule
],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})

export class MatchesComponent implements OnInit{

    @ViewChild(NewMatchModalComponent) newMatchModal!: NewMatchModalComponent

    searchText: string = ''
    matches: Match[] = []

    // to delete matches
    showDeleteButtons = false

    constructor(private matchesService: MatchesService, private cdr: ChangeDetectorRef) {}
  
    ngOnInit(): void { 
        this.loadMatches()
    }

    loadMatches() {
        this.matchesService.getMatches().subscribe({
        next: (data) => {
            console.log(data)
            this.matches = data
            this.cdr.detectChanges() // Forces data refresh
            },
            error: (err) => console.error('Errore caricamento partite', err)
        });
    }

    openNewMatchModal(){
        this.newMatchModal.open()
    }

    closeNewMatchModal() {
        console.log(this.newMatchModal.closeResult)
    }

    toggleDeleteMode() {
        this.showDeleteButtons = !this.showDeleteButtons;
    }

    // To delete a specific player
    deleteMatch(id: any){
        this.matchesService.deleteMatch(id).subscribe({
        next: () => {
            console.log('Team eliminato')
            this.loadMatches()
        },
        error: (err) => console.error('Errore eliminazione team', err)
        })
    }

    // To filter matches
    get filteredMatches(): Match[] {
        if (!this.searchText) 
            return this.matches
        return this.matches.filter(m =>
        m.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

}
