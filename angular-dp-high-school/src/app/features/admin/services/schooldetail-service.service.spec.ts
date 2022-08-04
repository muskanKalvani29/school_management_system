import { TestBed } from '@angular/core/testing';

import { SchooldetailServiceService } from './schooldetail-service.service';

describe('SchooldetailServiceService', () => {
  let service: SchooldetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchooldetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
