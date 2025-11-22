import { TestBed } from '@angular/core/testing';

import { Repuesto } from './repuesto';

describe('Repuesto', () => {
  let service: Repuesto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Repuesto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
