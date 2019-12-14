import { TestBed } from '@angular/core/testing';

import { LibroService } from './libro.service';

describe('LibroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibroService = TestBed.get(LibroService);
    expect(service).toBeTruthy();
  });
});
