import { TestBed } from '@angular/core/testing';

import { SesionIniciadaService } from './sesion-iniciada.service';

describe('SesionIniciadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionIniciadaService = TestBed.get(SesionIniciadaService);
    expect(service).toBeTruthy();
  });
});
