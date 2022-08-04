import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCode500Component } from './error-code500.component';

describe('ErrorCode500Component', () => {
  let component: ErrorCode500Component;
  let fixture: ComponentFixture<ErrorCode500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCode500Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCode500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
