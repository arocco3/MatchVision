import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Match } from '../../../Models/Match';
import { Team } from '../../../Models/Team';
import { Set } from '../../../Models/Set';
import { MatchesService } from '../../../services/matchesService';
import { Player } from '../../../Models/Player';

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
    match: Match | null =  null
    team!: Team
    sets!: Set[]
    players!: Player[]
  
    activeTab: 'match' | 'players' = 'match';


    constructor(private route: ActivatedRoute, private matchesService: MatchesService, private cdr: ChangeDetectorRef){}
  
    ngOnInit(): void {
        this.sets = []
        this.players = []

        let id = Number(this.route.snapshot.paramMap.get('id'))
        
        if (id) {            
            this.loadMatch(id)
            this.loadSets(id)
        }
    }
      
    loadMatch(id: number): void {
        this.matchesService.getMatch(id).subscribe({
            next: (res) => {
                this.match = res
                this.cdr.detectChanges()
            },
            error: (err) => console.error('Errore caricamento dettagli match', err)
        });
    }
  
    loadSets(id: number): void {
        this.matchesService.getMatchSets(id).subscribe({
            next: (res) => {
                this.sets = res;
                this.loadMatchPlayers()
                this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore caricamento set', err)
        })
    }

    loadMatchPlayers(): void {
        this.sets.forEach((set, index) => {
            set.players.forEach((player, index) => {
                if(!this.players.includes(player)){
                    this.players.push(player)
                }
            })
        })
    }
    

}