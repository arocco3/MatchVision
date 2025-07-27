import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})

export class MatchComponent {
  matchId: string | null;

  constructor(private route: ActivatedRoute) {
    this.matchId = this.route.snapshot.paramMap.get('id');
  }
}
