import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }
}

