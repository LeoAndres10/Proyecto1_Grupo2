import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class User {


private apiUrl = 'https://proyecto1-3m7h.onrender.com/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get(this.apiUrl+'/users', { headers });
  }

   insertarUsuario(credentials: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.post(this.apiUrl+'/users', credentials, { headers });
  }

 
}

