import { TestBed } from '@angular/core/testing';

import { TeacherOwnServiceService } from './teacher-own-service.service';

describe('TeacherOwnServiceService', () => {
  let service: TeacherOwnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherOwnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
