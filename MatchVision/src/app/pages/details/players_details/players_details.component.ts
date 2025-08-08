import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-players_details',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './players_details.component.html',
  styleUrls: ['./players_details.component.scss']
})

export class PlayersDetailsComponent {
  title = 'PlayersDetails';
}