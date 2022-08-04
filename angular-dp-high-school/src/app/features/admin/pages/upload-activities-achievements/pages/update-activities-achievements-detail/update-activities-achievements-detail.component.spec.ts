import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivitiesAchievementsDetailComponent } from './update-activities-achievements-detail.component';

describe('UpdateActivitiesAchievementsDetailComponent', () => {
  let component: UpdateActivitiesAchievementsDetailComponent;
  let fixture: ComponentFixture<UpdateActivitiesAchievementsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActivitiesAchievementsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActivitiesAchievementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
