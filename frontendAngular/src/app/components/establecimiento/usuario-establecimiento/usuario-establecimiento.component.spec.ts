import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEstablecimientoComponent } from './usuario-establecimiento.component';

describe('UsuarioEstablecimientoComponent', () => {
  let component: UsuarioEstablecimientoComponent;
  let fixture: ComponentFixture<UsuarioEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
