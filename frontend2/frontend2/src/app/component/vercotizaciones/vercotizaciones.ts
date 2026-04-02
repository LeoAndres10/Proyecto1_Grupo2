import { Component, inject } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Cotizacion, cotizacionService } from '../../services/cotizacion';
import { CommonModule } from '@angular/common';
import { App } from '../../app';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-vercotizaciones',
  standalone:true,
  imports: [RouterOutlet,CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vercotizaciones.html',
  styleUrl: './vercotizaciones.css',
})
export class Vercotizaciones implements OnInit{
search= new FormControl('');
 private router= inject(Router)
private sanitizer= inject(DomSanitizer)
safeUrl?: SafeResourceUrl;
private firestore= inject(Firestore)
cotizacion: any[] = [];
  cotizaciones$: Observable<any[]>;
  constructor(
    private cotizacionService: cotizacionService,
    protected serviceE: App
  ) {
      const ref = collection(this.firestore, 'cotizaciones');
    this.cotizaciones$ = collectionData(ref, { idField: 'id' });
    this.search.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((value) => this.cotizacionService.buscarPorNombre(value ?? ''))
        ).subscribe((data) => {
          this.cotizaciones$ = of(data);
        });
  }

  ngOnInit() {
    this.cotizacionService.getCotizacion().subscribe(data => {
      this.cotizacion = data;
    });
  }

  verCotizacion(id: string) {
    this.router.navigate(['/cotizaciones', id]);
  }

   logout() {
    this.serviceE.logout();
}

verPDF(url?: string) {
  if (!url) {
    alert('Esta cotización no tiene PDF');
    return;
  }
  window.open(url, '_blank');
}
onBuscar() {
  const query= this.search.value?.trim() ?? '';
  if (query) {
    this.cotizacionService.buscarPorNombre(query).subscribe(data => this.cotizaciones$ = of(data));
   
  } else {
    this.cotizaciones$ = of([]);
    
  }
}
}


