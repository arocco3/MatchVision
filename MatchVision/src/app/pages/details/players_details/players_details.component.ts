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
    title = 'PlayersDetails'
    player: Player | null =  null
    matches!: Match[]
    teams!: Team[]

    constructor(private route: ActivatedRoute, private playersService: PlayersService, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
        this.matches = []
        this.teams = []

        let id = Number(this.route.snapshot.paramMap.get('id'))
        
        if (id) {            
            this.loadPlayer(id)
            this.loadMatches(id)
            this.loadTeams(id)
        }
    }
    
    loadPlayer(id: number): void {
        this.playersService.getPlayer(id).subscribe({
            next: (res) => {
                this.player = res
                this.cdr.detectChanges()
            },
            error: (err) => console.error('Errore caricamento dettagli player', err)
        });
    }

    loadMatches(id: number): void {
        this.playersService.getPlayerMatches(id).subscribe({
            next: (res) => {
            this.matches = res;
            this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore caricamento partite', err)
        })
    }
    
    loadTeams(id: number): void {
        this.playersService.getPlayerTeams(id).subscribe({
            next: (res) => {
            this.teams = res;
            this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore caricamento squadre', err)
        })
    }
}