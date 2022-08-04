import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInquiryResponseComponent } from './update-inquiry-response.component';

describe('UpdateInquiryResponseComponent', () => {
  let component: UpdateInquiryResponseComponent;
  let fixture: ComponentFixture<UpdateInquiryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInquiryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInquiryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
