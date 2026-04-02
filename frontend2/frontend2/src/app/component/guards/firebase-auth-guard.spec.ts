import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firebaseAuthGuard } from './firebase-auth-guard';

describe('firebaseAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firebaseAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
