import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { supabase } from './supabase';
import { collection, collectionData } from '@angular/fire/firestore';


export interface Factura{
  
  id?: string;
  numero: string;
  cliente?: string;
  total: number;
  archivoURL: string; // URL del PDF en Storage
  timestamp: any;
}
@Injectable({ providedIn: 'root' })
export class Repuesto {
  private API_URL = 'https://proyecto1-3m7h.onrender.com/api';
private carritoSource = new BehaviorSubject<any[]>([]);
carrito$ = this.carritoSource.asObservable();


  constructor(private http: HttpClient,private firestore: Firestore) {}
 getTodos(): Observable<any> {
    return from(
      supabase
        .from('registro_compras')
        .select('*')
        .order('fecha_compra', { ascending: false })
    );
  }

 actualizarCarrito(nuevosItems: any[]) {
  const carritoActual = this.carritoSource.getValue();

  // Concatenar los nuevos items al carrito actual
  const carritoActualizado = [...carritoActual, ...nuevosItems];

  this.carritoSource.next(carritoActualizado);
}

  
  getRepuestos(): Observable<any[]> {
    return from(
      supabase
        .from('repuestos')
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

        return data.map(r => ({
          ...r,
          cantidad_disponible: r.cantidad // SOLO frontend
        }));
      })
    );
  }
getInventario(): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get<[any]>(this.API_URL+'/inventario/todos', { headers });
  }
buscarRepuesto(query: string): Observable<any[]> {
  const safeQuery = query.trim();

  return from(
    supabase
      .from('repuestos')
      .select('*')
      .ilike('nombre', `%${safeQuery}%`)
  ).pipe(
    map((resp: any) => resp.data || [])
  );
}
  buscarPorNombre(nombre: string): Observable<Factura[]> {
    const ref = collection(this.firestore, 'facturacion');

    return collectionData(ref, { idField: 'id' }).pipe(
      map(cots =>(
        cots as Factura[]).filter(c =>
          c.cliente?.toLowerCase().includes(nombre.toLowerCase())
        )
      )
    );
  }
  getCotizacion(): Observable<any[]> {
    const ref = collection(this.firestore, 'facturacion');
    return collectionData(ref, { idField: 'id' });
  }
  eliminarRepuesto(id: string): Observable<boolean> {
  return from(
    supabase
      .from('repuestos')
      .delete()
      .eq('id', id)
  ).pipe(
    map(resp => !resp.error)
  );
}


   actualizarRepuesto(datos: any, id: number): Observable<any> {
  return from(
    supabase
      .from('repuestos')
      .update(datos)
      .eq('id', id)
      .select() 
      .single()
  );
}
  nuevoRepuesto(credentials: any): Observable<any> {
    return from(
      supabase
      .from('repuestos')
      .insert([credentials])
      .select() 
      .single()
    )
  }


carritoRepuesto(id: string):Observable<any>{

  return from(
    supabase
      .from('repuestos')
      .select('*')
      .eq('id', id)
      .single() // devuelve un solo objeto
  ).pipe(
    map(resp => {
      if (!resp.data) {
        throw { status: 403, message: 'No se encontró id', data: null };
      }
      return { status: 200, data: resp.data, message: 'Repuesto encontrado' };
    })
  );
}

inventario(id: String):Observable<any>{
const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });
    return this.http.get<[any]>(this.API_URL+'/inventario/'+id, {headers});
}

nuevoInventario(carrito: any[]): Observable<any> {
  
  // Mapear los items del carrito al formato de registro_compras
   if (!carrito || carrito.length === 0) {
    return new Observable(observer => observer.error('El carrito está vacío'));
  }
  const items = carrito.map(item => ({
    repuesto_id: Number(item.id),
    codigo_repuesto: item.codigo,
    nombre_repuesto: item.nombre,
    marca_repuesto: item.marca,
    precio_unitario: Number(item.precio ?? 0) * Number(item.cantidad ?? 0),
    cantidad_vendida: Number(item.cantidad ?? 0),
    precio_unidad: Number(item.precio ?? 0),
    fecha_compra: new Date().toISOString()
    
    // opcional si la columna no tiene defaul      
  }));

  return from(
    supabase
      .from('registro_compras')
      .insert(items)
      .select() // devuelve los registros insertados
  ).pipe(
    mergeMap(({data, error}) => {
       console.log('INSERT registro_compras DATA:', data);
    console.log('INSERT registro_compras ERROR:', error);

    if (error) {
      throw error; // 👈 ESTO ES CLAVE
    }
       const rpcCalls = carrito.map(item => {
        const cantidadComprar = Number(item.cantidad ?? 0);

        

            return from(
          supabase.rpc('descontar_stock', {
             p_repuesto_id: Number(item.id),
            p_cantidad: cantidadComprar
       })
      );

            
          });
          return forkJoin(rpcCalls);
        }),
    map(() => ({ message: 'Compra registrada y stock actualizado' }))
      );
    }
   
}