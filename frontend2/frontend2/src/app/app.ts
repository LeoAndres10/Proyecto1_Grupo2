import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
 import { supabase } from '../app/services/supabase'; 
import { Repuestos } from './component/repuestos/repuestos';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { alertaSuccess, alertaWarning } from './component/alertas/alertas';

import { firebaseConfig } from '../enviroment';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
    private router = inject(Router);
  constructor() {}

 

  logout() {

supabase.auth.signOut()
    .then(() => {
      console.log('Sesión cerrada');
      // Opcional: limpiar tokens o datos locales
      localStorage.clear();
      // Redirigir a login
      alertaSuccess('Sesión cerrada');
     this.router.navigate(['/login']); // Redirige al login
    })
    .catch(err => console.error('Error cerrando sesión:', err));
 
  }
}

