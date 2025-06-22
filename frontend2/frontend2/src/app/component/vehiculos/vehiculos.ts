import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../services/vehiculo';
@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.scss'
})
export class Vehiculos implements OnInit{

vehiculos: any[] = [];
  errorMessage: string = '';
  constructor(private vehiculosService: Vehiculo) {}

  ngOnInit() {
    this.loadVehiculos();
  }

  loadVehiculos() {
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

}
