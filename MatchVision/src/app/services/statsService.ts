import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Player } from '../Models/Player'

@Injectable({
    providedIn: 'root'
})

export class StatsService {

    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) {}
    
    getMatchStats(matchId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/match_details/${matchId}/stats/`)
    }

    getSetsStats(setId: number | null): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/match_details/sets/${setId}/stats/`)
    }

    getSetPlayerStats(setId: number, player: Player): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/match_details/sets/${setId}/player/${player.id}/stats/`);
    }

}
