import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Repuesto {
  private API_URL = 'http://localhost:5000/api/repuestos';
private carritoSource = new BehaviorSubject<any[]>([]);
carrito$ = this.carritoSource.asObservable();


  constructor(private http: HttpClient) {}


 actualizarCarrito(nuevosItems: any[]) {
  const carritoActual = this.carritoSource.getValue();

  // Concatenar los nuevos items al carrito actual
  const carritoActualizado = [...carritoActual, ...nuevosItems];

  this.carritoSource.next(carritoActualizado);
}

  getRepuesto(): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get<[any]>(this.API_URL+'/todos', { headers });
  }
getInventario(): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get<[any]>(this.API_URL+'/inventario/todos', { headers });
  }
  buscarRepuesto(query: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    }); 
    const safequery= encodeURIComponent(query);
    return this.http.get<any[]>(`${this.API_URL}?q=${safequery}`, {headers});
  }

  eliminarRepuesto(id: String): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.delete(this.API_URL+'/eliminar/'+id, {headers});
  }


   actualizarRepuesto(credentials: any, id: Number): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.put<[any]>(this.API_URL+'/actualizar/'+id, credentials, {headers});
  }

  nuevoRepuesto(credentials: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.post<[any]>(this.API_URL+'/registrar', credentials, {headers});
  }


carritoRepuesto(id: String):Observable<any>{
const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.get<[any]>(this.API_URL+'/agregar/'+id, {headers});
}
inventario(id: String):Observable<any>{
const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.get<[any]>(this.API_URL+'/inventario/'+id, {headers});
}

nuevoInventario(carrito: any[]): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.post<[any]>(this.API_URL+'/inventario/agregar-compra',carrito, {headers});
  }

}