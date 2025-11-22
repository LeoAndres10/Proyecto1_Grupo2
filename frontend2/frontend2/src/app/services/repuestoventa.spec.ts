import { TestBed } from '@angular/core/testing';

import { Repuestoventa } from './repuestoventa';

describe('Repuestoventa', () => {
  let service: Repuestoventa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Repuestoventa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
