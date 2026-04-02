import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vercotizaciones } from './vercotizaciones';

describe('Vercotizaciones', () => {
  let component: Vercotizaciones;
  let fixture: ComponentFixture<Vercotizaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vercotizaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vercotizaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
