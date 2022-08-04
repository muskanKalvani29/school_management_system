import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCodeDefaultComponent } from './error-code-default.component';

describe('ErrorCodeDefaultComponent', () => {
  let component: ErrorCodeDefaultComponent;
  let fixture: ComponentFixture<ErrorCodeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCodeDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCodeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
