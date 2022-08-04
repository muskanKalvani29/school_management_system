import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQueryResponseComponent } from './update-query-response.component';

describe('UpdateQueryResponseComponent', () => {
  let component: UpdateQueryResponseComponent;
  let fixture: ComponentFixture<UpdateQueryResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQueryResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQueryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
