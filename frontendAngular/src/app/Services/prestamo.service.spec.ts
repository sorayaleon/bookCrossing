import { TestBed } from '@angular/core/testing';

import { PrestamoService } from './prestamo.service';

describe('PrestamoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestamoService = TestBed.get(PrestamoService);
    expect(service).toBeTruthy();
  });
});
