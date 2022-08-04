import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeeStructureComponent } from './update-fee-structure.component';

describe('UpdateFeeStructureComponent', () => {
  let component: UpdateFeeStructureComponent;
  let fixture: ComponentFixture<UpdateFeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFeeStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
