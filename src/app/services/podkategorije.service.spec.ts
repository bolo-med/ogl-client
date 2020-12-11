import { TestBed } from '@angular/core/testing';

import { PodkategorijeService } from './podkategorije.service';

describe('PodkategorijeService', () => {
  let service: PodkategorijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodkategorijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
