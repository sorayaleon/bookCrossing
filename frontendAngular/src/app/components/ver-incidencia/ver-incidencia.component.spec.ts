import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIncidenciaComponent } from './ver-incidencia.component';

describe('VerIncidenciaComponent', () => {
  let component: VerIncidenciaComponent;
  let fixture: ComponentFixture<VerIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
