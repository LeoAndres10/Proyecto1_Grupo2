import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Repuestos } from '../repuestos/repuestos';
import { Repuesto } from '../../services/repuesto';
import { alertaSuccess } from '../alertas/alertas';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entrada } from '../entrada/entrada';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../../services/supabase';
import { Inventario as InventarioService } from '../../services/inventario';
import { App } from '../../app';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-inventario',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule, RouterModule,RouterOutlet],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.css']
})
export class Inventario implements OnInit {

private inventarioSource = new BehaviorSubject<any[]>([]);
  inventario$ = this.inventarioSource.asObservable();
 errorMessage: string = '';
   id !: Number;
   datos: any[] = [];
   Total: number| null= null;
constructor(  protected serviceI: Repuesto, protected serviceE: App, protected serviceInventario: InventarioService){}

  ngOnInit() {
  

  this.obtenerInventario();
}
  
deleteInventario(id: string): void{
    this.errorMessage = '';
    this.serviceInventario.eliminarRepuestoI(id).subscribe({

      next: () => {
        this.datos = this.datos.filter(r => r.id !== id);
        alertaSuccess('Se ha eliminado correctamente');},    

 
      error: (error) => console.error('Error al eliminar repuesto:', error)
    });
};
  calcularCarrito(){
     let total=0;
  
    for (let i = 0; i < this.datos!.length; i++) {
       const precio = Number(this.datos![i].precio_unitario);
       
    
    if (!isNaN(precio)) {
      total += precio;
    }
  }

  this.Total = total;
 
  return this.Total;
   
   
  }
  
  
  obtenerInventario() {

   this.serviceI.getTodos().subscribe({
      next: ({ data, error }) => {
       
        console.log('Datos de inventario:', data);
          this.datos = data;
         
        
      }
    });

  }

  logout() {
    this.serviceE.logout();
}
} 



