
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../services/cliente';
@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class Clientes implements OnInit{

clientes: any[] = [];
  errorMessage: string = '';
  constructor(private clientesService: Cliente) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.errorMessage = '';
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data.data;
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
}
