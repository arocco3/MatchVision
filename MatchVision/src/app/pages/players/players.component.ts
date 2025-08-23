import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { NewPlayerModalComponent } from './newPlayerModal/newPlayerModal.component';

interface Player {
  id?: number;
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
  ],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit, AfterViewInit{

  @ViewChild(NewPlayerModalComponent) newPlayerModal!: NewPlayerModalComponent;

  players: Player[] = [];

  constructor(private playersService: PlayersService){}

  ngOnInit(): void {
    this.playersService.getPlayers().subscribe({
      next: (data) => {
        console.log(data);
        this.players = data;
      },
      error: (err) => console.error('Errore caricamento players', err)
    });
  }

  ngAfterViewInit(): void {
    
  }

  openNewPlayerModal(){
    this.newPlayerModal.open();
  }

  closeNewPlayerModal() {
    console.log(this.newPlayerModal.closeResult);
  }

}