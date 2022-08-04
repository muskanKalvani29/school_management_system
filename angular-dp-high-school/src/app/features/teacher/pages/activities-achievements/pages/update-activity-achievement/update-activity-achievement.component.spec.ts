import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityAchievementComponent } from './update-activity-achievement.component';

describe('UpdateActivityAchievementComponent', () => {
  let component: UpdateActivityAchievementComponent;
  let fixture: ComponentFixture<UpdateActivityAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActivityAchievementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActivityAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
