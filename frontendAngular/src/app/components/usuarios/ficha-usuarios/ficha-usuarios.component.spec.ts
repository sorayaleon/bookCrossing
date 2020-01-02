import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUsuariosComponent } from './ficha-usuarios.component';

describe('FichaUsuariosComponent', () => {
  let component: FichaUsuariosComponent;
  let fixture: ComponentFixture<FichaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
