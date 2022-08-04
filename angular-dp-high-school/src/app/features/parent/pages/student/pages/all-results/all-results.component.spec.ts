import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResultsComponent } from './all-results.component';

describe('AllResultsComponent', () => {
  let component: AllResultsComponent;
  let fixture: ComponentFixture<AllResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
