import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsuariosComponent } from './update-usuarios.component';

describe('UpdateUsuariosComponent', () => {
  let component: UpdateUsuariosComponent;
  let fixture: ComponentFixture<UpdateUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
