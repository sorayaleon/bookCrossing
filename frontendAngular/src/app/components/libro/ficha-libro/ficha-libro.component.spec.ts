import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaLibroComponent } from './ficha-libro.component';

describe('FichaLibroComponent', () => {
  let component: FichaLibroComponent;
  let fixture: ComponentFixture<FichaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
