import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivitiesAchievementsImageComponent } from './add-activities-achievements-image.component';

describe('AddActivitiesAchievementsImageComponent', () => {
  let component: AddActivitiesAchievementsImageComponent;
  let fixture: ComponentFixture<AddActivitiesAchievementsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActivitiesAchievementsImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivitiesAchievementsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
