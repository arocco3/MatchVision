import { inject, Injectable, signal } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { Player } from "../Models/Player"
import { Team } from "../Models/Team"
import { Match } from "../Models/Match"
import { Set } from "../Models/Set"
import { User } from "../Models/User"

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

    // General variables
    allPlayers = signal<Player[]>([])
    allTeams = signal<Team[]>([])
    allMatches = signal<Match[]>([])

    currentSet = signal<Set>({
        id: 0,
        match_id: 0,
        number: 0,
        home_score: 0,
        guest_score: 0,
        touches: [],
        events: [],
        players: []
})
    currentMatch = signal<Match>({
        id: 0,
        name: '',
        team_id: 0,
        date: '',
        result: ''
})
    currentUserId = signal<number>(0)

    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) {}

    // To load data from db, always updated
    loadPlayers() {
        this.playersService.getPlayers().subscribe(players => this.allPlayers.set(players))
    }

    loadTeams() {
        this.teamsService.getTeams().subscribe(teams => this.allTeams.set(teams))
    }

    loadMatches() {
        this.matchesService.getMatches().subscribe(matches => this.allMatches.set(matches))
    }
    
    // To organize data
    setCurrentMatch(match: Match) {
        this.currentMatch.set(match)
    }

    setCurrentSet(set: Set) {
        this.currentSet.set(set)
    }

    setCurrentUser(userId: number) {
        this.currentUserId.set(userId)
    }

    // To reset them
    resetCurrentMatch(){
        this.currentMatch.set({
            id: 0,
            name: '',
            team_id: 0,
            date: '',
            result: ''
        })
    }
    
    resetCurrentSet(){
        this.currentSet.set({
            id: 0,
            match_id: 0,
            number: 0,
            home_score: 0,
            guest_score: 0,
            touches: [],
            events: [],
            players: []
        })
    }
    
    resetCurrentUser(){
        this.currentUserId.set(0)
    }
}

