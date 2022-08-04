import { TestBed } from '@angular/core/testing';

import { FeesServiceService } from './fees-service.service';

describe('FeesServiceService', () => {
  let service: FeesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
