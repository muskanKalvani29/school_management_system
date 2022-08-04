import { TestBed } from '@angular/core/testing';

import { ParentOwnServiceService } from './parent-own-service.service';

describe('ParentOwnServiceService', () => {
  let service: ParentOwnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentOwnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
