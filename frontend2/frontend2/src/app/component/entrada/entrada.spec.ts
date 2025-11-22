import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entrada } from './entrada';

describe('Entrada', () => {
  let component: Entrada;
  let fixture: ComponentFixture<Entrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entrada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
