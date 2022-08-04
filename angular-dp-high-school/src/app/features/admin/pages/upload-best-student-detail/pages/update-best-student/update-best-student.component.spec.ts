import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBestStudentComponent } from './update-best-student.component';

describe('UpdateBestStudentComponent', () => {
  let component: UpdateBestStudentComponent;
  let fixture: ComponentFixture<UpdateBestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBestStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
