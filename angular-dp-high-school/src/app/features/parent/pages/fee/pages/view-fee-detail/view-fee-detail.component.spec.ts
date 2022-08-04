import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeeDetailComponent } from './view-fee-detail.component';

describe('ViewFeeDetailComponent', () => {
  let component: ViewFeeDetailComponent;
  let fixture: ComponentFixture<ViewFeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
