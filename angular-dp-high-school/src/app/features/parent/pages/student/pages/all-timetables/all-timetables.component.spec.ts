import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimetablesComponent } from './all-timetables.component';

describe('AllTimetablesComponent', () => {
  let component: AllTimetablesComponent;
  let fixture: ComponentFixture<AllTimetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTimetablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
