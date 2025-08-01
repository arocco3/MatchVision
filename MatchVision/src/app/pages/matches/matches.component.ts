import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matches',
  standalone: true,
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})

export class MatchesComponent {
  title = 'Matches';
  matchId: string | null;

  constructor(private route: ActivatedRoute) {
    this.matchId = this.route.snapshot.paramMap.get('id');
  }
}
