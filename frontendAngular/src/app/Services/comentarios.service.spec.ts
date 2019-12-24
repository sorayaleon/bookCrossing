import { TestBed } from '@angular/core/testing';

import { ComentariosService } from './comentarios.service';

describe('ComentariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComentariosService = TestBed.get(ComentariosService);
    expect(service).toBeTruthy();
  });
});
