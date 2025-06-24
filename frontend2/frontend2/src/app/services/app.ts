import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class App {

private apiUrl = 'http://localhost:5000/api'; // Cambia esto según tu backend

  constructor(private http: HttpClient) {}

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
