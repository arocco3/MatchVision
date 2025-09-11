import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../Models/Match';
import { Set } from '../Models/Set';
import { Team } from '../Models/Team';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient) {}

    getMatches(): Observable<Match[]> {
        return this.http.get<Match[]>(`${this.apiUrl}/matches/`);
    }

    getMatch(id: number): Observable<Match> {
        return this.http.get<Match>(`${this.apiUrl}/matches/${id}/`);
    }

    getMatchSets(id: number): Observable<Set[]> {
        return this.http.get<Set[]>(`${this.apiUrl}/match_details/${id}/sets/`);
    }

    getMatchTeam(id: number): Observable<Team> {
        return this.http.get<Team>(`${this.apiUrl}/match_details/${id}/team/`);
    }

    createMatch(match: Match): Observable<Match> {
        return this.http.post<Match>(`${this.apiUrl}/matches/create/`, match);
    }

    updateMatch(id: number, payload: { results: any[] }): Observable<Match> {
        return this.http.put<Match>(`${this.apiUrl}/matches/update/${id}/`, payload);
    }

    deleteMatch(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/matches/delete/${id}/`);
    }
}
