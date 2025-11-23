import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginS {

private apiUrl = 'https://proyecto1-3m7h.onrender.com/api'; // Cambia esto según tu backend

  constructor(private http: HttpClient) {}

  login(userData: { Nombre: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
