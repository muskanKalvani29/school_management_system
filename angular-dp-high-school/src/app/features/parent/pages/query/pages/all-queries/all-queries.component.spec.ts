import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQueriesComponent } from './all-queries.component';

describe('AllQueriesComponent', () => {
  let component: AllQueriesComponent;
  let fixture: ComponentFixture<AllQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
