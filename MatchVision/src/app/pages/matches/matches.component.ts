import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatchesService } from '../../services/matchesService'
import { NewMatchModalComponent } from './newMatchModal/newMatchModal.component';
import { Match } from '../../Models/Match';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/globalService';

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

    constructor(private matchesService: MatchesService, public globalService: GlobalService) {}
    
    @ViewChild(NewMatchModalComponent) newMatchModal!: NewMatchModalComponent

    searchText: string = ''

    // to delete matches
    showDeleteButtons = false
    
    ngOnInit(): void { 
        this.globalService.loadMatches()
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

    // To delete a specific match
    deleteMatch(id: any){
        this.matchesService.deleteMatch(id).subscribe({
        next: () => {
            console.log('Match eliminato')
            this.globalService.loadMatches()
        },
        error: (err) => console.error('Errore eliminazione match', err)
        })
    }

    // To filter matches
    get filteredMatches(): Match[] {
        if (!this.searchText) 
            return this.globalService.allMatches()
        return this.globalService.allMatches().filter(m =>
        m.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        this.globalService.transformDateFormat(m.timestamp).includes(this.searchText.toLowerCase())
        );
    }

}
