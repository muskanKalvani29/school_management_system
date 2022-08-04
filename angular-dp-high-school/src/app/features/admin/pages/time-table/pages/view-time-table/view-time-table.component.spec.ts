import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeTableComponent } from './view-time-table.component';

describe('ViewTimeTableComponent', () => {
  let component: ViewTimeTableComponent;
  let fixture: ComponentFixture<ViewTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
