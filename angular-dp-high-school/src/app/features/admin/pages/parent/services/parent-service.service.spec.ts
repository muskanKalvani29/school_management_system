import { TestBed } from '@angular/core/testing';

import { ParentServiceService } from './parent-service.service';

describe('ParentServiceService', () => {
  let service: ParentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
