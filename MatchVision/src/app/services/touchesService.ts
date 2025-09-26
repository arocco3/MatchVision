import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Touch } from '../Models/Touch';

@Injectable({
  providedIn: 'root'
})

export class TouchesService {

    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) {}

    createTouch(touch: Touch): Observable<Touch> {
        return this.http.post<Touch>(`${this.apiUrl}/touches/create/`, touch);
    }

    getTouchesByPlayerMatch(playerId: number, matchId: number): Observable<Touch[]> {
        return this.http.get<Touch[]>(`${this.apiUrl}/touches/player/${playerId}/match/${matchId}/`);
    }

    getTouchesByPlayerMatchSet(playerId: number, matchId: number, setId: number): Observable<Touch[]> {
        return this.http.get<Touch[]>(`${this.apiUrl}/touches/player/${playerId}/match/${matchId}/set/${setId}/`);
    }

    deleteTouch(id: number | undefined): Observable<any> {
        return this.http.delete(`${this.apiUrl}/touches/delete/${id}/`);
    }
}
