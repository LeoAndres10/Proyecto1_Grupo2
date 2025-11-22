import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Venta } from '../../services/venta';
import { Entrada } from '../entrada/entrada';
 declare var bootstrap : any;
@Component({
  selector: 'app-ventas',
  standalone:true,
  imports: [CommonModule, FormsModule, Entrada],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {
  @ViewChild('modalVenta', { static: false }) modalElement!:ElementRef;
  ventas : any[] = [];
  errorMessage  : string= '';
  fecha: string='';
  vehiculo_id: number | null= null;
  cliente_id: number| null= null;
  vendedor_id: number| null= null;
  precio_total: number| null= null;
  impuestos: number| null= null;

  constructor(private ventaService : Venta ){
  }

  ngOnInit(): void {
      this.loadVentas();
  }
openModalB() {
 
        this.fecha='';
        this.vehiculo_id=0;
        this.cliente_id=0;
        this.vendedor_id=0;
        this.precio_total=0;
        this.impuestos=0;
   
  }

  loadVentas(){
    this.errorMessage='';
    this.ventaService.getVentas().subscribe({
      next: (data) =>{
       return this.ventas= data;
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
closeModalRegistro() {
    const modal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);


    modal.hide();
  
  }
  addVentas(){
const credentialsNew = {
      fecha: this.fecha,
      vehiculo_id: this.vehiculo_id,
      cliente_id: this.cliente_id,
      vendedor_id: this.vehiculo_id,
      precio_total:this.precio_total,
      impuestos: this.impuestos
    };
    this.errorMessage = '';
    this.ventaService.insertarVenta(credentialsNew).subscribe({
      
      next: (response) => {
        console.log('Usuario Ingresado correctamente:', response);
       
       this.ventas.push(response.data);
       this.closeModalRegistro();
      },
      error: (error) => {
        console.error('Error de login:', error);
        
        // Detecta si viene un mensaje personalizado del backend
        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
      }

    });
}
  }

