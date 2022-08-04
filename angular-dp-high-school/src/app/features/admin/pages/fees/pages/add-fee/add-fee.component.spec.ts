import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeComponent } from './add-fee.component';

describe('AddFeeComponent', () => {
  let component: AddFeeComponent;
  let fixture: ComponentFixture<AddFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
