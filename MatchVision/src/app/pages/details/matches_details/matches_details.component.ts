import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-matches_details',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './matches_details.component.html',
  styleUrls: ['./matches_details.component.scss']
})

export class MatchesDetailsComponent {
  title = 'MatchesDetails';
}