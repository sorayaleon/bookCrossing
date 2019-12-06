import { TestBed } from '@angular/core/testing';

import { AntesInicioSesionService } from './antes-inicio-sesion.service';

describe('AntesInicioSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AntesInicioSesionService = TestBed.get(AntesInicioSesionService);
    expect(service).toBeTruthy();
  });
});
