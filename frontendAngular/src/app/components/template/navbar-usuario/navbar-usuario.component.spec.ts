import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsuarioComponent } from './navbar-usuario.component';

describe('NavbarUsuarioComponent', () => {
  let component: NavbarUsuarioComponent;
  let fixture: ComponentFixture<NavbarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
