import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaComponent } from './incidencia.component';

describe('IncidenciaComponent', () => {
  let component: IncidenciaComponent;
  let fixture: ComponentFixture<IncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
