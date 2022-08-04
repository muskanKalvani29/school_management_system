import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCode404Component } from './error-code404.component';

describe('ErrorCode404Component', () => {
  let component: ErrorCode404Component;
  let fixture: ComponentFixture<ErrorCode404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCode404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCode404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
