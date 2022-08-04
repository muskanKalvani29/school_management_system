import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryResponseComponent } from './inquiry-response.component';

describe('InquiryResponseComponent', () => {
  let component: InquiryResponseComponent;
  let fixture: ComponentFixture<InquiryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
