import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-matches',
  standalone: true,imports: [
    RouterModule,
  ],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})

export class MatchesComponent implements OnInit{

  constructor(matchesService: MatchesService) {}
  
  ngOnInit(): void {  }
}
