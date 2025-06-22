import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '../../services/app';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private App: App,
    private router: Router
  ) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.errorMessage = '';
    this.App.login(credentials).subscribe({
      
      next: (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
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
