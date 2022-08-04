import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOtpComponent } from './password-otp.component';

describe('PasswordOtpComponent', () => {
  let component: PasswordOtpComponent;
  let fixture: ComponentFixture<PasswordOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
