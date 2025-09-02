import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../Models/Team';
import { Player } from '../Models/Player';


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

    createTeam(team: Team): Observable<Team> {
      return this.http.post<Team>(`${this.apiUrl}/teams/create/`, team);
    }
  
    updateTeam(id: number, team: Team): Observable<Team> {
      return this.http.put<Team>(`${this.apiUrl}/teams/update/${id}/`, team);
    }
  
    deleteTeam(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/teams/delete/${id}/`);
    }

    getPlayers(): Observable<Player[]> {
      return this.http.get<Player[]>(`${this.apiUrl}/players/`);
  }
}
