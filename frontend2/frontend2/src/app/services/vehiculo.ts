import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Vehiculo {


private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get(this.apiUrl+'/vehiculos', { headers });
  }

 
   eliminarVehiculo(id: String): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.delete(this.apiUrl+'/vehiculos/eliminar/'+id, {headers});
  }


   actualizarVehiculo(credentials: any, id: Number): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.put(this.apiUrl+'/vehiculos/actualizar/'+id, credentials, {headers});
  }

  nuevoAuto(credentials: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.post(this.apiUrl+'/vehiculos', credentials, {headers});
  }

}


