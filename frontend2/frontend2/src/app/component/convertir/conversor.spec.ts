import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversor } from './conversor';

describe('Convertir', () => {
  let component: Conversor;
  let fixture: ComponentFixture<Conversor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conversor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
