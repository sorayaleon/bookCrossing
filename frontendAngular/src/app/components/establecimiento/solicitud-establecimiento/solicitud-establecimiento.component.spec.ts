import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEstablecimientoComponent } from './solicitud-establecimiento.component';

describe('SolicitudEstablecimientoComponent', () => {
  let component: SolicitudEstablecimientoComponent;
  let fixture: ComponentFixture<SolicitudEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
