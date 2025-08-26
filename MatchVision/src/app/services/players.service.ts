import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id: number;
  name: string;
  surname: string;
  number: number;
  role: string;
}
export interface Match {
  id: number;
  name: string;
  timestamp: string;
  teams: Team[];
  results: string;
}
export interface Team {
  id: number;
  name: string;
  players: Player[];
}

@Injectable({
  providedIn: 'root' 
})

export class PlayersService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players/`);
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/players/${id}/`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/players/create/`, player);
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/players/update/${id}/`, player);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/players/delete/${id}/`);
  }
  
  getPlayerTeams(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/players_details/${id}/`);
  }

  getPlayerMatches(id: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/players_details/${id}/`);
  }
}
