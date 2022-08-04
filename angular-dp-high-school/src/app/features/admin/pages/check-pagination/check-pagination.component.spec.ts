import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPaginationComponent } from './check-pagination.component';

describe('CheckPaginationComponent', () => {
  let component: CheckPaginationComponent;
  let fixture: ComponentFixture<CheckPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
