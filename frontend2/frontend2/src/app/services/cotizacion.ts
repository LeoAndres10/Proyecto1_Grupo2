import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { supabase } from './supabase';

export interface Cotizacion{
  
  id?: string;
  numero: string;
  cliente?: string;
  total: number;
  archivoURL: string; // URL del PDF en Storage
  timestamp: any;
}

@Injectable({
  providedIn: 'root',
})

export class cotizacionService {



  constructor(private firestore: Firestore) {}

  buscarPorNombre(nombre: string): Observable<Cotizacion[]> {
    const ref = collection(this.firestore, 'cotizaciones');

    return collectionData(ref, { idField: 'id' }).pipe(
      map(cots =>(
        cots as Cotizacion[]).filter(c =>
          c.cliente?.toLowerCase().includes(nombre.toLowerCase())
        )
      )
    );
  }

  getCotizacion(): Observable<any[]> {
    const ref = collection(this.firestore, 'cotizaciones');
    return collectionData(ref, { idField: 'id' });
  }

  getCotizacionById(id: string): Observable<any> {
    const ref = doc(this.firestore, `cotizaciones/${id}`);
    return docData(ref, { idField: 'id' });
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
  getProductos(): Observable<any[]> {
    return from(
      supabase
        .from('repuestos')  // Nombre de tu tabla
        .select('*')
    ).pipe(
       map(data => data.data || [])
     
    );
  }
}
