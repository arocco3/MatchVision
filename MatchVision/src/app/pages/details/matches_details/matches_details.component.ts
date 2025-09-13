import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Match } from '../../../Models/Match';
import { Team } from '../../../Models/Team';
import { Set } from '../../../Models/Set';
import { MatchesService } from '../../../services/matchesService';
import { Player } from '../../../Models/Player';
import { GlobalService } from '../../../services/globalService';
import { StatsService } from '../../../services/statsService';

@Component({
    selector: 'app-matches_details',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './matches_details.component.html',
    styleUrls: ['./matches_details.component.scss']
})

export class MatchesDetailsComponent implements OnInit{

    title = 'MatchesDetails'
    match: Match | null =  null
    team!: Team
    sets!: Set[]
    players!: Player[]
    id!: number
    df_match: any
    df_sets: any[] = []
    
  
    activeTab: 'match' | 'players' = 'match';


    constructor(private route: ActivatedRoute,
        private matchesService: MatchesService, 
        private statsService: StatsService,
        public globalService: GlobalService,
        private cdr: ChangeDetectorRef
    ){}
  
    ngOnInit(): void {
        this.sets = []
        this.players = []

        this.id = Number(this.route.snapshot.paramMap.get('id'))
        
        if (this.id) {            
            this.loadMatch(this.id)
        }
    }

    loadMatch(id: number): void {
        this.matchesService.getMatch(id).subscribe({
            next: (res) => {
                this.match = res
                this.loadSets(res.id)
                this.loadTeam(res.id)
                this.statsService.getMatchStats(res.id).subscribe({
                    next: (res) => {
                        this.df_match = res
                        console.log("Match stats caricate correttamente")
                    }, 
                    error: (err) => console.error("Errore caricamento statistiche match", err)
                })
                
                this.cdr.detectChanges()
            },
            error: (err) => console.error('Errore caricamento dettagli match', err)
        });
    }
  
    loadTeam(id: number): void {
        this.matchesService.getMatchTeam(id).subscribe({
            next: (res) => {
                this.team = res
                this.cdr.detectChanges()
        },
        error: (err) => console.error('Errore caricamento team', err)
        })
    }
    
    loadSets(id: number): void {
        this.matchesService.getMatchSets(id).subscribe({
            next: (res) => {
                this.sets = res
                this.loadMatchPlayers()
                this.createDfSets()
                this.cdr.detectChanges()
        },
        error: (err) => console.error('Errore caricamento set', err)
        })
    }

    createDfSets() {
        this.sets.forEach((set, index) => {
            this.statsService.getSetsStats(set.id).subscribe({
                    next: (res) => {
                        this.df_sets[index] = res
                        this.cdr.detectChanges()
                        console.log("Set stats caricate correttamente")
                    },
                    error: (err) => console.error("Errore caricamento statistiche set ${set.id}", err)
                })
        })
    }

    loadMatchPlayers(): void {
        this.sets.forEach((set, index) => {
            if(set.players)
            set.players.forEach((player, index) => {
                if(!this.players.includes(player)){
                    this.players.push(player)
                }
            })
        })
    }

    buildMatchResults() {
        let results: string = ''
        this.sets.forEach((s, index) =>
            results = results.concat('[', String(s.home_score), '-', String(s.guest_score), '] ')
        )
        return results
    }

    getColumns(data: any[]): string[] {
        return data && data.length > 0 ? Object.keys(data[0]) : [];
    }


}