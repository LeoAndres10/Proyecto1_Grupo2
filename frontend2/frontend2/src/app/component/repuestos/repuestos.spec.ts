import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repuestos } from './repuestos';

describe('Repuestos', () => {
  let component: Repuestos;
  let fixture: ComponentFixture<Repuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repuestos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Repuestos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
