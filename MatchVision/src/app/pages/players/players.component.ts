import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayersService } from '../../services/players.service';

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
  ],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit{

  constructor(private playersService: PlayersService){}

  ngOnInit(): void { console.log(this.playersService.playerarray) }

  players: Player[] = [];
  
  title = 'Players';
}