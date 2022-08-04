import { TestBed } from '@angular/core/testing';

import { HolidayServiceService } from './holiday-service.service';

describe('HolidayServiceService', () => {
  let service: HolidayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
