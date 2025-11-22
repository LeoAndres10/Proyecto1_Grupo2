import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {

 private dataCarrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.dataCarrito.asObservable();

  // Método para actualizar el carrito
  actualizarCarrito(carrito: any[]) {
    this.dataCarrito.next(carrito);
  }

  // Método para obtener el carrito actual
  obtenerCarrito() {
    return this.dataCarrito.getValue();
  }
}
