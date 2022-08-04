import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInformationComponent } from './teacher-information.component';

describe('TeacherInformationComponent', () => {
  let component: TeacherInformationComponent;
  let fixture: ComponentFixture<TeacherInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
