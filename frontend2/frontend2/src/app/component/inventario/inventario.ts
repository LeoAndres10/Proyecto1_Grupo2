import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Repuestos } from '../repuestos/repuestos';
import { Repuesto } from '../../services/repuesto';
import { alertaSuccess } from '../alertas/alertas';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entrada } from '../entrada/entrada';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-inventario',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.css']
})
export class Inventario implements OnInit {

private inventarioSource = new BehaviorSubject<any[]>([]);
  inventario$ = this.inventarioSource.asObservable();
 errorMessage: string = '';
   id !: Number;
   datos: any[]= [];
   Total: number| null= null;
constructor( private serviceI: Repuesto){}

  ngOnInit() {
  this.serviceI.carrito$.subscribe({
    next: (items) => this.inventarioSource.next(items),
    error: (err) => this.errorMessage = err
  });

  this.obtenerInventario();
}
  
  calcularCarrito(){
     let total=0;
  
    for (let i = 0; i < this.datos.length; i++) {
       const precio = Number(this.datos[i].precio_unitario);
       
    
    if (!isNaN(precio)) {
      total += precio;
    }
  }

  this.Total = total;
 
  return this.Total;
   
   
  }
  
  
obtenerInventario():void{

    this.serviceI.getInventario().subscribe({
      next: (response) => {
        this.datos = response.data;
        this.calcularCarrito();
      },
      error: (error) => {
        console.error('Error al obtener vehiculos:', error);

        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }

      }
    });

  }
}




