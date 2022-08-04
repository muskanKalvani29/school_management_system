import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPdfComponent } from './result-pdf.component';

describe('ResultPdfComponent', () => {
  let component: ResultPdfComponent;
  let fixture: ComponentFixture<ResultPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
