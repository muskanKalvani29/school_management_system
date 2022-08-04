import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentsMeetingComponent } from './add-parents-meeting.component';

describe('AddParentsMeetingComponent', () => {
  let component: AddParentsMeetingComponent;
  let fixture: ComponentFixture<AddParentsMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentsMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentsMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
