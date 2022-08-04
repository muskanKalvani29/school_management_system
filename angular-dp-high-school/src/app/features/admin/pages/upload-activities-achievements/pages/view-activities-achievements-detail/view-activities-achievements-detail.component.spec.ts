import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivitiesAchievementsDetailComponent } from './view-activities-achievements-detail.component';

describe('ViewActivitiesAchievementsDetailComponent', () => {
  let component: ViewActivitiesAchievementsDetailComponent;
  let fixture: ComponentFixture<ViewActivitiesAchievementsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActivitiesAchievementsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivitiesAchievementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
