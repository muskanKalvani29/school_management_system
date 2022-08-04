import { TestBed } from '@angular/core/testing';

import { ActivitiesAchievementsService } from './activities-achievements.service';

describe('ActivitiesAchievementsService', () => {
  let service: ActivitiesAchievementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesAchievementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
