import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user';
import { Router } from '@angular/router';
import { Datousuario } from '../datousuario/datousuario';
import { alertaSuccess } from '../alertas/alertas';
 declare var bootstrap : any;
@Component({
  selector: 'app-users',
  standalone:true,
  imports: [CommonModule,FormsModule,Datousuario],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
  @ViewChild('modalUsuario', { static: false }) modalElement!:ElementRef;
users: any[] = [];
  Nombre: string = '';
  Password: string = '';
  errorMessage: string = '';
   
  constructor(private usersService: User, private router: Router) {}

  ngOnInit() {
   
    this.loadUsers();
  
    
  }

  openModalB() {
 
        this.Nombre='';
        this.Password='';
   
  }

  closeModalB() {
    const modal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);
   

    modal.hide();
    
  }
  loadUsers() {
    this.errorMessage = '';
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
    
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);

        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }

      }
    });
  }
  Usuario() {
    const credentials = {
      Nombre: this.Nombre,
      Password: this.Password
    };
    this.errorMessage = '';
    this.usersService.insertarUsuario(credentials).subscribe({
      
      next: (response) => {
          
        console.log('Usuario Ingresado correctamente:', response);
          this.users.push(response.data);
        
     
      
        alertaSuccess('Usuario Creado Correctamente' );
        this.Nombre='';
        this.Password='';
        
         this.closeModalB();
    
        this.loadUsers();
        
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





 
  
