import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Set } from '../Models/Set';

export interface Match {
  
}

@Injectable({
  providedIn: 'root'
})
export class setService {

  private apiUrl = 'http://localhost:8000/api';
  
    constructor(private http: HttpClient) {}
  
    getSets(): Observable<Set[]> {
      return this.http.get<Set[]>(`${this.apiUrl}/sets/`);
    }
    getSetsByMatch(matchId:number): Observable<Set[]> {
      return this.http.get<Set[]>(`${this.apiUrl}/sets/${matchId}`);
    }
  
    getMatchSet(setId: number): Observable<Set> {
      return this.http.get<Set>(`${this.apiUrl}/sets/${setId}/`);
    }
  
    createSet(set: Set): Observable<Set> {
      return this.http.post<Set>(`${this.apiUrl}/sets/create/`, set);
    }
  
    updateSet(id: number, set: Set): Observable<Set> {
      return this.http.put<Set>(`${this.apiUrl}/sets/update/${id}/`, set);
    }
  
    deleteSet(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/sets/delete/${id}/`);
    }
}
