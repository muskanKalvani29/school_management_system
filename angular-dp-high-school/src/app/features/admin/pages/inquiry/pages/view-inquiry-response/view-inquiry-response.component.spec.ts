import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInquiryResponseComponent } from './view-inquiry-response.component';

describe('ViewInquiryResponseComponent', () => {
  let component: ViewInquiryResponseComponent;
  let fixture: ComponentFixture<ViewInquiryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInquiryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInquiryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
