import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstablecimientoComponent } from './create-establecimiento.component';

describe('CreateEstablecimientoComponent', () => {
  let component: CreateEstablecimientoComponent;
  let fixture: ComponentFixture<CreateEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
