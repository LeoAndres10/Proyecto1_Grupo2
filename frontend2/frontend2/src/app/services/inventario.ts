import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class Inventario {

  constructor() { }

    getTodos(): Observable<any> {
    return from(
      supabase
        .from('registro_compras')
        .select('*')
        .order('fecha_compra', { ascending: false })
    );
  }

  eliminarRepuestoI(id: string): Observable<boolean> {
    return from(
      supabase
        .from('registro_compras')
        .delete()
        .eq('id', id)
    ).pipe(
      map(resp => !resp.error)
    );
  }
}
