import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verfacturas } from './verfacturas';

describe('Verfacturas', () => {
  let component: Verfacturas;
  let fixture: ComponentFixture<Verfacturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verfacturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verfacturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
