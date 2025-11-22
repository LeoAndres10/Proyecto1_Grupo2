import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginS } from '../../services/loginS';
import {alertaSuccess,alertaError,alertaWarning} from '../alertas/alertas'
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
Nombre: string = '';
  Password: string = '';
  errorMessage: string = '';

  constructor(private authLogin: LoginS,
    private router: Router
  ) {}

  login() {
    const credentials = {
      Nombre: this.Nombre,
      Password: this.Password
    };
    this.errorMessage = '';
    this.authLogin.login(credentials).subscribe({
      
      next: (response) => {
        console.log('Login exitoso:', response);
        alertaSuccess('Login Exitoso');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
         
      },
      error: (error) => {
        console.error('Error de login:', error);
        alertaError('Credenciales invalidas')
        if (error.status===404) {
          this.errorMessage = error.error?.message || 'Usuario no encontrado';
          alertaError('Usuario no encontrado');
        }
        // Detecta si viene un mensaje personalizado del backend
        else if (error.status === 401 || error.status===403) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
          alertaError('Credenciales incorrectas');
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
      }

    });
  }
}
