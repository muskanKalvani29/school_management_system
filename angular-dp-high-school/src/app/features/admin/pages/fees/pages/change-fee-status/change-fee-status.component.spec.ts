import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFeeStatusComponent } from './change-fee-status.component';

describe('ChangeFeeStatusComponent', () => {
  let component: ChangeFeeStatusComponent;
  let fixture: ComponentFixture<ChangeFeeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFeeStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFeeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
