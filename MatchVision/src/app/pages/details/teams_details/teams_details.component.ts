import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Team } from '../../../Models/Team';
import { Match } from '../../../Models/Match';
import { TeamsService } from '../../../services/teamsService';
import { Player } from '../../../Models/Player';

@Component({
    selector: 'app-teams_details',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './teams_details.component.html',
    styleUrls: ['./teams_details.component.scss']
})

export class TeamsDetailsComponent implements OnInit{

    constructor(private route: ActivatedRoute, private teamsService: TeamsService, private cdr: ChangeDetectorRef) {}
    
    title = 'TeamsDetails';
    
    team: Team | null = null
    matches!: Match[]
    players!: Player[]
    
    ngOnInit(): void {
        this.matches = []
        this.players = []

        let id = Number(this.route.snapshot.paramMap.get('id'))

        if (id) {            
            this.loadTeam(id)
            this.loadPlayers(id)
            this.loadTeamMatches(id)
        }
    }

    loadTeam(id: number): void {
        this.teamsService.getTeam(id).subscribe({
            next: (res) => {
                this.team = res
                this.cdr.detectChanges()
            },
            error: (err) => console.error('Errore caricamento team', err)
        });
    }

    loadPlayers(id: number): void {
        this.teamsService.getTeamPlayers(id).subscribe({
            next: (res) => {
                this.players = res;
                this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore caricamento giocatori', err)
        })
    }

    loadTeamMatches(id: number): void {
        this.teamsService.getTeamMatches(id).subscribe({
            next: (res) => {
                this.matches = res;
                this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore caricamento partite', err)
        })
    }

}