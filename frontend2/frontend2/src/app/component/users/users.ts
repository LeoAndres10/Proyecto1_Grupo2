import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';
@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
users: any[] = [];
  errorMessage: string = '';
  constructor(private usersService: User) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.errorMessage = '';
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
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

}
