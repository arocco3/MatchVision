import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlayersService } from '../../services/playersService'
import { NewPlayerModalComponent } from './newPlayerModal/newPlayerModal.component'
import { FormsModule } from '@angular/forms'
import { Player } from '../../Models/Player'
import { GlobalService } from '../../services/globalService'

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    RouterModule,
    NewPlayerModalComponent,
    FormsModule
  ],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit{

    constructor(private playersService: PlayersService, public globalService: GlobalService){}

    @ViewChild(NewPlayerModalComponent) newPlayerModal!: NewPlayerModalComponent;

    searchText: string = '';

    // To get all players
    ngOnInit(): void {
        this.globalService.loadPlayers()
    }

    openNewPlayerModal(){
        this.newPlayerModal.open();
        console.log(this.globalService.allPlayers())
    }

    closeNewPlayerModal() {
        console.log(this.newPlayerModal.closeResult);
    }

    // To delete a specific player
    deletePlayer(id: any){
        this.playersService.deletePlayer(id).subscribe({
        next: () => {
            console.log('Player eliminato');
            this.globalService.loadPlayers();
        },
        error: (err) => console.error('Errore eliminazione player', err)
        })
    }

    // To filter players
    get filteredPlayers(): Player[] {
        if (!this.searchText) return this.globalService.allPlayers()
            return this.globalService.allPlayers().filter(p =>
            p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            p.surname.toLowerCase().includes(this.searchText.toLowerCase()) ||
            p.role!.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

}