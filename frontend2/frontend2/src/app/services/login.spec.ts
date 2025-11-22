import { TestBed } from '@angular/core/testing';

import { LoginS } from './loginS';

describe('App', () => {
  let service: LoginS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
