import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBestStudentsComponent } from './all-best-students.component';

describe('AllBestStudentsComponent', () => {
  let component: AllBestStudentsComponent;
  let fixture: ComponentFixture<AllBestStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBestStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBestStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
