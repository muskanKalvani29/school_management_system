import { TestBed } from '@angular/core/testing';

import { FeeStructureService } from './fee-structure.service';

describe('FeeStructureService', () => {
  let service: FeeStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
