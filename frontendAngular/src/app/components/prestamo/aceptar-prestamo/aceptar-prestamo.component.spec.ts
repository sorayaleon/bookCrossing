import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarPrestamoComponent } from './aceptar-prestamo.component';

describe('AceptarPrestamoComponent', () => {
  let component: AceptarPrestamoComponent;
  let fixture: ComponentFixture<AceptarPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
