import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllActivitiesAchivementsComponent } from './get-all-activities-achivements.component';

describe('GetAllActivitiesAchivementsComponent', () => {
  let component: GetAllActivitiesAchivementsComponent;
  let fixture: ComponentFixture<GetAllActivitiesAchivementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllActivitiesAchivementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllActivitiesAchivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
