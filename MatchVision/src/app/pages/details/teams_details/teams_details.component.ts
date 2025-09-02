import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teams_details',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './teams_details.component.html',
  styleUrls: ['../../players/players.component.scss', '../../matches/matches.component.scss', './teams_details.component.scss']
})

export class TeamsDetailsComponent {
  title = 'TeamsDetails';
}