import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLibroComponent } from './create-libro.component';

describe('CreateLibroComponent', () => {
  let component: CreateLibroComponent;
  let fixture: ComponentFixture<CreateLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
