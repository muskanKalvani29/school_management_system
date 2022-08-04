import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityAchievementComponent } from './view-activity-achievement.component';

describe('ViewActivityAchievementComponent', () => {
  let component: ViewActivityAchievementComponent;
  let fixture: ComponentFixture<ViewActivityAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActivityAchievementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
