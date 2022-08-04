import { TestBed } from '@angular/core/testing';

import { TimeTableServiceService } from './time-table-service.service';

describe('TimeTableServiceService', () => {
  let service: TimeTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
