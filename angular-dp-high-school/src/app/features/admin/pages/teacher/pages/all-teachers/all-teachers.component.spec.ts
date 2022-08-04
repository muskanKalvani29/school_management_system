import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeachersComponent } from './all-teachers.component';

describe('AllTeachersComponent', () => {
  let component: AllTeachersComponent;
  let fixture: ComponentFixture<AllTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
