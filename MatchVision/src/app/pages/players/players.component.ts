import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  players: Player[] = [];
  
  title = 'Players';
}