import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Match {
  
}

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private apiUrl = 'http://localhost:8000/api';
  
    constructor(private http: HttpClient) {}
  
    getMatches(): Observable<Match[]> {
      return this.http.get<Match[]>(`${this.apiUrl}/matches/`);
    }
  
    getMatch(id: number): Observable<Match> {
      return this.http.get<Match>(`${this.apiUrl}/matches/${id}/`);
    }
  
    createMatch(match: Match): Observable<Match> {
      return this.http.post<Match>(`${this.apiUrl}/matches/create/`, match);
    }
  
    updateMatch(id: number, match: Match): Observable<Match> {
      return this.http.put<Match>(`${this.apiUrl}/matches/update/${id}/`, match);
    }
  
    deleteMatch(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/matches/delete/${id}/`);
    }
}
