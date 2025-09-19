import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Match } from '../../../Models/Match'
import { Team } from '../../../Models/Team'
import { Set } from '../../../Models/Set'
import { MatchesService } from '../../../services/matchesService'
import { Player } from '../../../Models/Player'
import { GlobalService } from '../../../services/globalService'
import { StatsService } from '../../../services/statsService'

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
    df_sets_csv: any[] = []
    df_set_players_csv: any[][] = []

    df_match_text: string = ''
    df_sets_text: string[] = []
    df_set_players_text: string[][] = []


    df_sets: any[] = []
    df_set_players: any[][] = [] // df list per the chosen player
    
  
    activeTab: 'match' | 'players' = 'match'


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
        
        if (this.id) this.loadMatch(this.id)
    }

    loadMatch(id: number) {
        this.matchesService.getMatch(id).subscribe({
            next: (res) => {
                this.match = res
                this.loadSets(res.id)
                this.loadTeam(res.id)

                // for CSV
                this.loadMatchStats(res.id)
                // for the table
                this.statsService.getMatchStats(res.id).subscribe({
                    next: (df) => {
                        this.df_match = df
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
                this.loadSetStats()
                this.loadMatchPlayers()
                this.loadSetPlayerStats()

                this.cdr.detectChanges()
            },
            error: (err) => console.error('Errore caricamento set', err)
        })
    }

    
    loadMatchPlayers(): void {
        this.sets.forEach((set) => {
            if(set.players)
                set.players.forEach((player) => {
                    if(!this.players.some(p => p.id === player.id)) {
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

    getColumns(data: any[] | null | undefined): string[] {
        if (!data || data.length === 0) {
            return []
        }
        return Object.keys(data[0] ?? {})
    }








    // Creating CSVs
    loadMatchStats(matchId: number) {
        this.statsService.getMatchStats(matchId).subscribe(data => {
            this.df_match = data
            this.df_match_text = this.generateCSV(data)
        })
    }
    
    loadSetStats() {
        this.sets.forEach((s, index) => {
            this.statsService.getSetsStats(s.id).subscribe({
                next: (data) => {
                    this.df_sets[index] = data
                    this.df_sets_text[index] = this.generateCSV(data)
                }
            })
            this.cdr.detectChanges()
        })
        console.log(this.df_sets_text)
    }
    
    loadSetPlayerStats() {
        this.players.forEach((p, pIndex) => {
            this.df_set_players[pIndex] = []
            this.sets.forEach((s, sIndex) => {
                this.statsService.getSetPlayerStats(s.id, p).subscribe(df => {
                    this.df_set_players[pIndex][sIndex] = df
                })
            })
        })
        this.cdr.detectChanges()
    }
    
    
    generateCSV(df: any) {

        const cols = Object.keys(df[0])
        const header = cols.join(';')
        const rows = df.map((r: any) => cols.map(c => r[c] ?? '').join(';'))

        return [header, ...rows].join('\n')
    }


    copyCSV(text: string) {
        if (!text) return
        navigator.clipboard.writeText(text)
    }


}