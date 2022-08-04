import { TestBed } from '@angular/core/testing';

import { ParentsMeetingServiceService } from './parents-meeting-service.service';

describe('ParentsMeetingServiceService', () => {
  let service: ParentsMeetingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentsMeetingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
