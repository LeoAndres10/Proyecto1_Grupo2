import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Conversors {

public apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getConversor(moneda: string): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get<[]>(`${this.apiUrl}/convertir/${moneda}`, {headers});
  }
}
