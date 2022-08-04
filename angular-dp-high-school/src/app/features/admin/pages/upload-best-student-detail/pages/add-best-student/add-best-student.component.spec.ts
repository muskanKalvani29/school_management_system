import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBestStudentComponent } from './add-best-student.component';

describe('AddBestStudentComponent', () => {
  let component: AddBestStudentComponent;
  let fixture: ComponentFixture<AddBestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBestStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
