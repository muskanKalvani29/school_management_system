import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimeTableComponent } from './update-time-table.component';

describe('UpdateTimeTableComponent', () => {
  let component: UpdateTimeTableComponent;
  let fixture: ComponentFixture<UpdateTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
