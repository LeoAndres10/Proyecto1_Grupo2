
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
import { Repuesto } from '../../services/repuesto';
@Component({
  selector: 'app-verfacturas',
  standalone:true,
  imports: [RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule, RouterModule],
  templateUrl: './verfacturas.html',
  styleUrl: './verfacturas.css',
})
export class Verfacturas implements OnInit{
search= new FormControl('');
 private router= inject(Router)
private sanitizer= inject(DomSanitizer)
safeUrl?: SafeResourceUrl;
private firestore= inject(Firestore)
cotizacion: any[] = [];
  cotizaciones$: Observable<any[]>;
  constructor(
    private repuestoService: Repuesto,
    protected serviceE: App
  ) {
      const ref = collection(this.firestore, 'facturacion');
    this.cotizaciones$ = collectionData(ref, { idField: 'id' });
    this.search.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((value) => this.repuestoService.buscarPorNombre(value ?? ''))
        ).subscribe((data) => {
          this.cotizaciones$ = of(data);
        });
  }

  ngOnInit() {
    this.repuestoService.getCotizacion().subscribe(data => {
      this.cotizacion = data;
    });
  }

  verCotizacion(id: string) {
    this.router.navigate(['/verfacturas', id]);
  }

   logout() {
    this.serviceE.logout();
}

verPDF(url?: string) {
  if (!url) {
    alert('Esta factura no tiene PDF');
    return;
  }
  window.open(url, '_blank');
}
onBuscar() {
  const query= this.search.value?.trim() ?? '';
  if (query) {
    this.repuestoService.buscarPorNombre(query).subscribe(data => this.cotizaciones$ = of(data));
   
  } else {
    this.cotizaciones$ = of([]);
    
  }
}
}
