import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllParentsMeetingComponent } from './all-parents-meeting.component';

describe('AllParentsMeetingComponent', () => {
  let component: AllParentsMeetingComponent;
  let fixture: ComponentFixture<AllParentsMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllParentsMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllParentsMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
