import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEstablecimientoComponent } from './ficha-establecimiento.component';

describe('FichaEstablecimientoComponent', () => {
  let component: FichaEstablecimientoComponent;
  let fixture: ComponentFixture<FichaEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
