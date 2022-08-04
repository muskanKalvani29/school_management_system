import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeTablesComponent } from './all-time-tables.component';

describe('AllTimeTablesComponent', () => {
  let component: AllTimeTablesComponent;
  let fixture: ComponentFixture<AllTimeTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTimeTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimeTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
