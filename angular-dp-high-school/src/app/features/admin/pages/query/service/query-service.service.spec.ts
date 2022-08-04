import { TestBed } from '@angular/core/testing';

import { QueryServiceService } from './query-service.service';

describe('QueryServiceService', () => {
  let service: QueryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
