import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQueryComponent } from './view-query.component';

describe('ViewQueryComponent', () => {
  let component: ViewQueryComponent;
  let fixture: ComponentFixture<ViewQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
