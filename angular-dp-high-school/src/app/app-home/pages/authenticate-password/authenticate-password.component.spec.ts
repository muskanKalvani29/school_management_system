import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatePasswordComponent } from './authenticate-password.component';

describe('AuthenticatePasswordComponent', () => {
  let component: AuthenticatePasswordComponent;
  let fixture: ComponentFixture<AuthenticatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
