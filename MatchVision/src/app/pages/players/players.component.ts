import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { NewPlayerModalComponent } from './newPlayerModal/newPlayerModal.component';
import { FormsModule } from '@angular/forms';

interface Player {
  id: number;
  name: string;
  surname: string;
  number: number;
  role: string;
}

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

  @ViewChild(NewPlayerModalComponent) newPlayerModal!: NewPlayerModalComponent;

  players: Player[] = [];
  searchText: string = '';

  constructor(private playersService: PlayersService, private cdr: ChangeDetectorRef){}

  // To get all players
  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playersService.getPlayers().subscribe({
      next: (data) => {
        console.log(data);
        this.players = data;
        this.cdr.detectChanges(); // Forces data refresh
      },
      error: (err) => console.error('Errore caricamento players', err)
    });
  }

  openNewPlayerModal(){
    this.newPlayerModal.open();
  }

  closeNewPlayerModal() {
    console.log(this.newPlayerModal.closeResult);
  }

  // To delete a specific player
  deletePlayer(id: any){
    this.playersService.deletePlayer(id).subscribe({
      next: () => {
        console.log('Player eliminato');
        this.loadPlayers();
      },
      error: (err) => console.error('Errore eliminazione player', err)
    })
  }

  // To filter players
  get filteredPlayers(): Player[] {
  if (!this.searchText) return this.players;
  return this.players.filter(p =>
    p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
    p.surname.toLowerCase().includes(this.searchText.toLowerCase()) ||
    p.role.toLowerCase().includes(this.searchText.toLowerCase())
  );
}


}