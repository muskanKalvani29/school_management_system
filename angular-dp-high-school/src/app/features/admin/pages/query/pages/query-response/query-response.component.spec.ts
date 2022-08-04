import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryResponseComponent } from './query-response.component';

describe('QueryResponseComponent', () => {
  let component: QueryResponseComponent;
  let fixture: ComponentFixture<QueryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
