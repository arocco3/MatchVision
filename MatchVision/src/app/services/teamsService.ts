import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../Models/Team';
import { Player } from '../Models/Player';
import { Match } from '../Models/Match';


@Injectable({
  providedIn: 'root'
})

export class TeamsService {

    private apiUrl = 'http://localhost:8000';
  
    constructor(private http: HttpClient) {}
  
    // getTeamsByUser(id: number): Observable<Team[]> {
    //   return this.http.get<Team[]>(`${this.apiUrl}/teams/`, id);
    // }
  
    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.apiUrl}/teams/`);
    }

    getTeam(id: number): Observable<Team> {
        return this.http.get<Team>(`${this.apiUrl}/teams/${id}/`);
    }

    getTeamPlayers(id: number): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.apiUrl}/team_details/${id}/players`);
    }

    getTeamMatches(id: number): Observable<Match[]> {
        return this.http.get<Match[]>(`${this.apiUrl}/team_details/${id}/matches`);
    }

    createTeam(team: Team): Observable<Team> {
        return this.http.post<Team>(`${this.apiUrl}/teams/create/`, team);
    }
  
    updateTeam(id: number, team: Team): Observable<Team> {
        return this.http.put<Team>(`${this.apiUrl}/teams/update/${id}/`, team);
    }
  
    deleteTeam(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/teams/delete/${id}/`);
    }
}
