import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Conversors } from '../../services/conversors';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-convertir',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./conversor.html',
  styleUrl: './conversor.css'
})
export class Conversor implements OnInit{

conversorarray: any[] = [];
  errorMessage: string = '';
  moneda!: string;
  constructor(private route: ActivatedRoute,private conversorService: Conversors) {}
 
 
  ngOnInit(): void {
      const monedas= this.route.snapshot.paramMap.get('moneda');
      if (monedas) {
        this.moneda = monedas;
       this.loadConversor(monedas);
      }
  
 
    
    
  }

  loadConversor(moneda: string): void {
    this.errorMessage = '';
    this.conversorService.getConversor(moneda).subscribe({
      next: (data) => {
        return this.conversorarray = data;
      },
      error: (error) => {
        console.error('Error al convertir:', error);

        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }

      }
    });
  }
}





