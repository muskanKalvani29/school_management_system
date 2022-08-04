import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBestStudentComponent } from './view-best-student.component';

describe('ViewBestStudentComponent', () => {
  let component: ViewBestStudentComponent;
  let fixture: ComponentFixture<ViewBestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBestStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
