import { TestBed } from '@angular/core/testing';

import { BestStudentServiceService } from './best-student-service.service';

describe('BestStudentServiceService', () => {
  let service: BestStudentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestStudentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
