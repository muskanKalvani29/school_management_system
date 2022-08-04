import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityAchievementComponent } from './add-activity-achievement.component';

describe('AddActivityAchievementComponent', () => {
  let component: AddActivityAchievementComponent;
  let fixture: ComponentFixture<AddActivityAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActivityAchievementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
