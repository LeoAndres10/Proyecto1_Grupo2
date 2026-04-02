import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cotizaciones } from './cotizaciones';

describe('Cotizaciones', () => {
  let component: Cotizaciones;
  let fixture: ComponentFixture<Cotizaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cotizaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cotizaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
