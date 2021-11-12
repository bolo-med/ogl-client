import { TestBed } from '@angular/core/testing';

import { KatPodkatService } from './kat-podkat.service';

describe('KatPodkatService', () => {
  let service: KatPodkatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatPodkatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
