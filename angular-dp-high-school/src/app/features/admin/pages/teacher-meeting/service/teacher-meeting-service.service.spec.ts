import { TestBed } from '@angular/core/testing';

import { TeacherMeetingServiceService } from './teacher-meeting-service.service';

describe('TeacherMeetingServiceService', () => {
  let service: TeacherMeetingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherMeetingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
