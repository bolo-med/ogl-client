import { TestBed } from '@angular/core/testing';

import { PotkategorijeService } from './potkategorije.service';

describe('PotkategorijeService', () => {
  let service: PotkategorijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotkategorijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
