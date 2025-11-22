import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Venta {

  
private apiUrl = 'http://localhost:5000/api';
  constructor( private http: HttpClient) { }

  getVentas(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });

    return this.http.get(this.apiUrl+'/ventas',{headers});
  }

  insertarVenta(credentials: any): Observable<any> {
   
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.post(this.apiUrl+'/ventas', credentials, {headers});
  }

  }

