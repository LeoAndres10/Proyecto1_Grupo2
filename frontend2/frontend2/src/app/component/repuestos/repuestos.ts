import { Component } from '@angular/core';
import { Repuesto } from '../../services/repuesto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime,distinctUntilChanged,elementAt,switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { alertaError,alertaSuccess,alertaWarning } from '../alertas/alertas';
import { Entrada } from '../entrada/entrada';
import { ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;
@Component({
  
  selector: 'app-repuestos',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule, Entrada],
  templateUrl: './repuestos.html',
  styleUrl: './repuestos.css'
})
export class Repuestos {
  @ViewChild('modalRepuestoActualizar', { static: false }) modalElement!:ElementRef;
  @ViewChild('modalRepuesto', { static: false }) modalElements!: ElementRef;
   @ViewChild('modalRepuestoCarrito', { static: false }) modalElementos!: ElementRef;
resultados: any[] = [];
carrito: any[] = [];

  editando: boolean = false;
search= new FormControl('');
   Nombre: string = '';
   Codigo: string='';
  Marca: string = '';
  Cantidad: number | null = null;
  Precio: number  | null= null;
  Total: Number| null =null;
  Estante: number | null = null;
  repuestoSeleccionado: any = null;

  errorMessage: string = '';
  id !: Number;
  constructor(private repuesto: Repuesto, private route: ActivatedRoute) {
  this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.repuesto.buscarRepuesto(value ?? ''))
    ).subscribe((data) => {
      this.resultados = data;
    });
  }


Carrito(id: String){
 this.errorMessage = '';
    this.repuesto.carritoRepuesto(id).subscribe({
      next: (response) => {
      this.carrito.push(response.data)
    
        alertaSuccess('Elemento Agregado al Carrito');
      },
      error: (error) => {
        console.error('Error al obtener vehiculos:', error);
     //return this.carrito= this.resultados.find(u => u.id !== id), alertaSuccess('Se ha eliminado correctamente');
    
}})
};


  calcularCarrito(){
     let total=0;
  
    for (let i = 0; i < this.carrito.length; i++) {
       const precio = Number(this.carrito[i].Precio);
       
    
    if (!isNaN(precio)) {
      total += precio;
    }
  }

  this.Total = total;
  return this.Total;
   
   
  }
   openModalB() {
    const modal = new bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
  }

  closeModalB() {
    const modal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);
   

    modal.hide();
    
  }
  closeModalRegistro() {
    const modal = bootstrap.Modal.getInstance(this.modalElements.nativeElement);


    modal.hide();
  
  }
  onBuscar() {
    const query= this.search.value?.trim() ?? '';
    if (query) {
      this.repuesto.buscarRepuesto(query).subscribe(data => this.resultados = data);
     
    } else {
      this.resultados = [];
      this.loadRepuestos();
    }
  }
  ngOnInit(): void {
 
  this.loadRepuestos();
  const ids= Number(this.route.snapshot.paramMap.get('id'));
      if (ids) {
        this.id = ids;
    this.updateRepuesto(ids);
    this.addRepuesto();
      
      
      }
      
      
  }

       openModal() {

        this.Codigo='';
        this.Nombre='';
        this.Marca= '';
        this.Cantidad=0;
        this.Precio=0;
        this.Estante=0;
       

      
         
            
        }
       
      
openModalActualizar(repuesto: Repuestos) {
        this.id=repuesto.id;
        this.Codigo= repuesto.Codigo;
        this.Nombre= repuesto.Nombre;
        this.Marca= repuesto.Marca;
        this.Cantidad=repuesto.Cantidad;
        this.Precio=repuesto.Precio;
        this.Estante=repuesto.Estante;
       

      
         
            
        }
       
      
       

    
loadRepuestos(): void {
    this.errorMessage = '';
    this.repuesto.getRepuesto().subscribe({
      next: (response) => {
        this.resultados = response.data;
        
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


editarRepuesto(repuesto: any) {
  this.repuestoSeleccionado = { ...repuesto };
  this.id = repuesto.id;
  this.Codigo = repuesto.Codigo;
  this.Nombre = repuesto.Nombre;
  this.Marca = repuesto.Marca;
  this.Cantidad = repuesto.Cantidad;
  this.Precio = repuesto.Precio;
  this.Estante = repuesto.Estante;
}

  
deleteRepuesto(id: String): void{
    this.errorMessage = '';
    this.repuesto.eliminarRepuesto(id).subscribe(() =>{
      
     return this.resultados= this.resultados.filter(u => u.id !== id), alertaSuccess('Se ha eliminado correctamente');
    

    });

};

deleteRepuestoCarrito(id: String): void{
    this.errorMessage = '';
    this.repuesto.eliminarRepuesto(id).subscribe(() =>{
      
     return this.carrito= this.carrito.filter(u => u.id !== id), alertaSuccess('Se ha eliminado correctamente');
    

    });

};

updateRepuesto(id: Number): void{
    const credentials = {
      id:this.id,
   Codigo:this.Codigo,   
  Nombre: this.Nombre,
  Marca: this.Marca,
  Cantidad: this.Cantidad,
  Precio: this.Precio,
  Estante: this.Estante
    };
    this.errorMessage = '';
    this.repuesto.actualizarRepuesto(credentials,id).subscribe({
      
      next: (response) => {
    
       
        alertaSuccess('Se ha actualizdo correctamente')
    
        const index = this.resultados.findIndex(v => v.id === id);
       
        console.log('ID:', id);
console.log('token:' + response.token );
console.log('Repuesto seleccionado:', this.repuestoSeleccionado);
 
 
    if (index !== -1  && this.repuestoSeleccionado) {
      this.resultados[index] = { ...credentials };
      
         this.closeModalB();
    }
   
        this.editando=false;
      },
      error: (error) => {
        alertaError('Error de login:');
        
        // Detecta si viene un mensaje personalizado del backend
        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
      }

    });
  }
addRepuesto(){
const credentialsNew = {
      Codigo: this.Codigo,
      Nombre: this.Nombre,
      Marca: this.Marca,
      Cantidad: this.Cantidad,
      Precio: this.Precio,
      Estante:this.Estante
    };
    this.errorMessage = '';
    this.repuesto.nuevoRepuesto(credentialsNew).subscribe({
      
      next: (response) => {
        alertaSuccess('Se ha agregado correctamente');
     
       this.resultados.push(response.data);
       
      this.Codigo= '';
      this.Nombre='';
      this.Cantidad= 0;
      this.Marca='';
      this.Estante=0;
      this.Precio=0;

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
  
addInv(){
  
    this.errorMessage = '';
    this.repuesto.nuevoInventario(this.carrito).subscribe({
      
      next: (response) => {
        alertaSuccess('Se ha agregado correctamente');
     console.log('Respose:', response.data)
     
     
       
      this.Codigo= '';
      this.Nombre='';
      this.Cantidad= 0;
      this.Marca='';
      this.Cantidad=0;
      this.Precio=0;

     
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



};

