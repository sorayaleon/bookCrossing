import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEstablecimientoComponent } from './update-establecimiento.component';

describe('UpdateEstablecimientoComponent', () => {
  let component: UpdateEstablecimientoComponent;
  let fixture: ComponentFixture<UpdateEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
