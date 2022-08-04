import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQueryResponseComponent } from './view-query-response.component';

describe('ViewQueryResponseComponent', () => {
  let component: ViewQueryResponseComponent;
  let fixture: ComponentFixture<ViewQueryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQueryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQueryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
