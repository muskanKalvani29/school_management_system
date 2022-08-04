import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParentMeetingComponent } from './update-parent-meeting.component';

describe('UpdateParentMeetingComponent', () => {
  let component: UpdateParentMeetingComponent;
  let fixture: ComponentFixture<UpdateParentMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParentMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParentMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
