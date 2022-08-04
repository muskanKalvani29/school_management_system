import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInquiresComponent } from './all-inquires.component';

describe('AllInquiresComponent', () => {
  let component: AllInquiresComponent;
  let fixture: ComponentFixture<AllInquiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInquiresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
