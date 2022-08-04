import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentMeetingComponent } from './view-parent-meeting.component';

describe('ViewParentMeetingComponent', () => {
  let component: ViewParentMeetingComponent;
  let fixture: ComponentFixture<ViewParentMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParentMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParentMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
