import { TestBed } from '@angular/core/testing';

import { Conversors } from './conversors';

describe('Conversors', () => {
  let service: Conversors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conversors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
