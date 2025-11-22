import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../services/vehiculo';
import { identity } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Datoautos } from '../datoautos/datoautos';
import { alertaWarning, alertaError,alertaSuccess } from '../alertas/alertas';
 declare var bootstrap : any;
@Component({
  selector: 'app-vehiculos',
 
  imports: [CommonModule,FormsModule,Datoautos],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.scss'
})
export class Vehiculos implements OnInit{
  @ViewChild('modalVehiculo', { static: false }) modalElement!:ElementRef;
   @ViewChild('modalVehiculoActualizar', { static: false }) modalElements!: ElementRef;

vehiculos: any[] = [];
  marca: string = '';
  modelo: string = '';
  anio: number | null= null;
  precio: number | null = null;
  disponible: number | null = null;
  vehiculoSeleccionado: any = null;

  errorMessage: string = '';
  id !: Number;
  constructor(private vehiculosService: Vehiculo, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.loadVehiculos();
   
  const ids= Number(this.route.snapshot.paramMap.get('id'));
      if (ids) {
        this.id = ids;
     
      this.updateVehiculo(ids);
      this.addAuto();
      }
      
      
  }
  openModalB() {
 
        this.marca='';
        this.modelo='';
        this.anio=0;
        this.precio=0;
        this.disponible=0;
   
  }
  closeModalRegistro() {
    const modal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);


    modal.hide();
  
  }
  openModalActualizar(auto: Vehiculos) {
        this.id=auto.id;
        this.marca= auto.marca;
        this.modelo= auto.modelo;
        this.anio= auto.anio;
        this.precio=auto.precio;
        this.disponible=auto.disponible;
       

      
         
            
        }
       

  closeModalB() {
    const modal = bootstrap.Modal.getInstance(this.modalElements.nativeElement);
   

    modal.hide();
    
  }

editarVehiculo(auto: any) {
  this.vehiculoSeleccionado = { ...auto };
  this.id = auto.id;
  this.marca = auto.marca;
  this.modelo = auto.modelo;
  this.anio = auto.anio;
  this.precio = auto.precio;
  this.disponible = auto.disponible;
}

  loadVehiculos(): void {
    this.errorMessage = '';
    this.vehiculosService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data.data;
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
deleteVehiculo(id: String): void{
    this.errorMessage = '';
    this.vehiculosService.eliminarVehiculo(id).subscribe(() =>{
      alertaSuccess('Eliminado Correctamente');
     return this.vehiculos= this.vehiculos.filter(u => u.id !== id);
      

    });

};

updateVehiculo(id: Number): void{
    const credentials = {
      id:this.id,
  marca: this.marca,
  modelo: this.modelo,
  anio: this.anio,
  precio: this.precio,
  disponible: this.disponible
    };
    this.errorMessage = '';
    this.vehiculosService.actualizarVehiculo(credentials,id).subscribe({
      
      next: (response) => {
               
        alertaSuccess('Se ha actualizdo correctamente')
    
        const index = this.vehiculos.findIndex(v => v.id === id);
       
  
 
    if (index !== -1  && this.vehiculoSeleccionado) {
      this.vehiculos[index] = { ...credentials };
      
         this.closeModalB();
    }
   
    

    
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
addAuto(){
const credentialsNew = {
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio,
      precio: this.precio,
      disponible:this.disponible
    };
    this.errorMessage = '';
    this.vehiculosService.nuevoAuto(credentialsNew).subscribe({
      
      next: (response) => {
        console.log('Usuario Ingresado correctamente:', response);
   
       this.vehiculos.push(response.data);
        alertaSuccess('Ingresado Correctamente');
        this.marca= '';
      this.modelo='';
      this.anio= 0;
      this.precio=0;
      this.disponible=0;
      

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
