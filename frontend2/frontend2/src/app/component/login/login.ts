import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginS } from '../../services/loginS';
import {alertaSuccess,alertaError,alertaWarning} from '../alertas/alertas'
import { supabase } from '../../services/supabase';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
email: string = '';
  password: string = '';
  email1: string = '';
  password1: string = '';
  errorMessage: string = '';
  
  mensaje = '';
  constructor(private authLogin: LoginS,
    private router: Router
  ) {}

  login() {
    this.authLogin.login({ email: this.email, password: this.password })
      .subscribe({
        next: (data) => {
          console.log('Login exitoso:', data);
        this.router.navigate(['/home'])
        alertaSuccess('Login exitoso');
  
    },
        error: (err) => {
          console.error('Login falló:', err);
          this.mensaje = 'Usuario o contraseña incorrectos';
        }
      });
  }

  register() {
    this.authLogin.register(this.email1, this.password1).subscribe({
      next: ({ data, error }) => {
        if (error) {
          this.mensaje = error.message;
        } else {
          this.mensaje = 'Registro exitoso. Revisa tu correo.';
        }
      },
      error: err => this.mensaje = err.message
    });
  }
}

