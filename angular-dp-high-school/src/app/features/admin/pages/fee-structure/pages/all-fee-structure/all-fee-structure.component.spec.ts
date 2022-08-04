import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeeStructureComponent } from './all-fee-structure.component';

describe('AllFeeStructureComponent', () => {
  let component: AllFeeStructureComponent;
  let fixture: ComponentFixture<AllFeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFeeStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
