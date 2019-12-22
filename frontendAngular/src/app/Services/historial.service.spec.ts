import { TestBed } from '@angular/core/testing';

import { HistorialService } from './historial.service';

describe('HistorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistorialService = TestBed.get(HistorialService);
    expect(service).toBeTruthy();
  });
});
