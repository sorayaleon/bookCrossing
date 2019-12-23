import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionComponent } from './devolucion.component';

describe('DevolucionComponent', () => {
  let component: DevolucionComponent;
  let fixture: ComponentFixture<DevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
