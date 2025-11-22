import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datoautos } from './datoautos';

describe('Datoautos', () => {
  let component: Datoautos;
  let fixture: ComponentFixture<Datoautos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datoautos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datoautos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
