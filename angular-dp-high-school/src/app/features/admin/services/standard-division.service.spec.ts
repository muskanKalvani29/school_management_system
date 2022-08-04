import { TestBed } from '@angular/core/testing';

import { StandardDivisionService } from './standard-division.service';

describe('StandardDivisionService', () => {
  let service: StandardDivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardDivisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
