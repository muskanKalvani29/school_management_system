import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchoolDetailComponent } from './update-school-detail.component';

describe('UpdateSchoolDetailComponent', () => {
  let component: UpdateSchoolDetailComponent;
  let fixture: ComponentFixture<UpdateSchoolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSchoolDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSchoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
