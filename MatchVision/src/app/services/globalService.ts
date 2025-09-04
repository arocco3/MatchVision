import { inject, Injectable, signal } from "@angular/core"
import { Player } from "../Models/Player"
import { Team } from "../Models/Team"
import { Match } from "../Models/Match"
import { HttpClient } from "@angular/common/http"
import { PlayersService } from "./playersService"
import { TeamsService } from "./teamsService"
import { MatchesService } from "./matchesService"

@Injectable({
    providedIn: 'root' 
})

export class GlobalService {
    
    private playersService = inject(PlayersService);
    private teamsService = inject(TeamsService);
    private matchesService = inject(MatchesService);

    allPlayers = signal<Player[]>([])
    allTeams = signal<Team[]>([])
    allMatches = signal<Match[]>([])

    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) {}

    loadPlayers() {
        this.playersService.getPlayers().subscribe(players => this.allPlayers.set(players))
    }

    loadTeams() {
        this.teamsService.getTeams().subscribe(teams => this.allTeams.set(teams))
    }

    loadMatches() {
        this.matchesService.getMatches().subscribe(matches => this.allMatches.set(matches))
    }
    
}

