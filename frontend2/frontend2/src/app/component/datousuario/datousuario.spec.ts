import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datousuario } from './datousuario';

describe('Datousuario', () => {
  let component: Datousuario;
  let fixture: ComponentFixture<Datousuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datousuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datousuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
