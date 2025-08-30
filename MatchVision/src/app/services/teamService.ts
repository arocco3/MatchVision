import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../Models/Team';
import { Player } from '../Models/Player';



@Injectable({
  providedIn: 'root'
})
export class setService {

  private apiUrl = 'http://localhost:8000/api';
  
    constructor(private http: HttpClient) {}
  
    getTeamsByUser(id:number): Observable<Team[]> {
      return this.http.post<Team[]>(`${this.apiUrl}/team/`, id);
    }

  
    createTeam(players: Player[]): Observable<Team> {
      return this.http.post<Team>(`${this.apiUrl}/team/create/`, players);
    }
  
    updateTeam(id: number, team: Team): Observable<Team> {
      return this.http.put<Team>(`${this.apiUrl}/team/update/${id}/`, team);
    }
  
    deleteTeam(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/team/delete/${id}/`);
    }
}
