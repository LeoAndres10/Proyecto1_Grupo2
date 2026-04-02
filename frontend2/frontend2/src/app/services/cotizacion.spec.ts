import { TestBed } from '@angular/core/testing';

import { Cotizacion, cotizacionService } from './cotizacion';

describe('Cotizacion', () => {
  let service: cotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
