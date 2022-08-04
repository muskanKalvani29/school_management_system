import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFeesComponent } from './pay-fees.component';

describe('PayFeesComponent', () => {
  let component: PayFeesComponent;
  let fixture: ComponentFixture<PayFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
