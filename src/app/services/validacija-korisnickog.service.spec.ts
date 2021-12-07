import { TestBed } from '@angular/core/testing';

import { ValidacijaKorisnickogService } from './validacija-korisnickog.service';

describe('ValidacijaKorisnickogService', () => {
  let service: ValidacijaKorisnickogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacijaKorisnickogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
