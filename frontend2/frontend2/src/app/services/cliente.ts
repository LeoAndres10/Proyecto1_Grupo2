import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cliente {

private apiUrl = 'https://proyecto1-3m7h.onrender.com/api';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get(this.apiUrl+'/clientes', { headers });
  }
}
