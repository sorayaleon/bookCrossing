import { TestBed } from '@angular/core/testing';

import { EstablecimientoService } from './establecimiento.service';

describe('EstablecimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstablecimientoService = TestBed.get(EstablecimientoService);
    expect(service).toBeTruthy();
  });
});
