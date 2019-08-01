import { TestBed } from '@angular/core/testing';

import { VisitaMedicaService } from '../visita-medica/visita-medica.service';

describe('VisitaMedicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitaMedicaService = TestBed.get(VisitaMedicaService);
    expect(service).toBeTruthy();
  });
});
