import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstablecimientosComponent } from './gestion-establecimientos.component';

describe('GestionEstablecimientosComponent', () => {
  let component: GestionEstablecimientosComponent;
  let fixture: ComponentFixture<GestionEstablecimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEstablecimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
