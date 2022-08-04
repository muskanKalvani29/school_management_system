import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeeDetailComponent } from './update-fee-detail.component';

describe('UpdateFeeDetailComponent', () => {
  let component: UpdateFeeDetailComponent;
  let fixture: ComponentFixture<UpdateFeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
