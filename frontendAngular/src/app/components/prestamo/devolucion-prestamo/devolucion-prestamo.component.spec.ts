import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPrestamoComponent } from './devolucion-prestamo.component';

describe('DevolucionPrestamoComponent', () => {
  let component: DevolucionPrestamoComponent;
  let fixture: ComponentFixture<DevolucionPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
