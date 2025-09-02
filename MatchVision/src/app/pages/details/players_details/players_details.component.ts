import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PlayersService } from '../../../services/playersService';
import { Match } from '../../../Models/Match';
import { Team } from '../../../Models/Team';
import { Player } from '../../../Models/Player';

@Component({
  selector: 'app-players_details',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './players_details.component.html',
  styleUrls: ['./players_details.component.scss']
})

export class PlayersDetailsComponent implements OnInit{
    title = 'PlayersDetails';
    player?: Player;
    matches: Match[] = [];
    teams: Team[] = [];

    constructor(private route: ActivatedRoute, private playersService: PlayersService, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            // Player info
            this.playersService.getPlayer(id).subscribe({
                next: (res) => {
                    this.player = res;
                    this.cdr.detectChanges();
                },
                error: (err) => console.error('Errore caricamento dettagli player', err)
            });

            // Matches related to player
            this.playersService.getPlayerMatches(id).subscribe(m => this.matches = m);

            // Teams related to player
            this.playersService.getPlayerTeams(id).subscribe(t => this.teams = t);
        }
    }
}