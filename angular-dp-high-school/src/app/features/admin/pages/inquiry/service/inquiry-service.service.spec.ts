import { TestBed } from '@angular/core/testing';

import { InquiryServiceService } from './inquiry-service.service';

describe('InquiryServiceService', () => {
  let service: InquiryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
