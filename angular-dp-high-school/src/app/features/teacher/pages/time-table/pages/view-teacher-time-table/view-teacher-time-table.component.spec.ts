import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherTimeTableComponent } from './view-teacher-time-table.component';

describe('ViewTeacherTimeTableComponent', () => {
  let component: ViewTeacherTimeTableComponent;
  let fixture: ComponentFixture<ViewTeacherTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeacherTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeacherTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
