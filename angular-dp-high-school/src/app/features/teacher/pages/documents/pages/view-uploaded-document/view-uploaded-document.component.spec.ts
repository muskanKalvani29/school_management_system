import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadedDocumentComponent } from './view-uploaded-document.component';

describe('ViewUploadedDocumentComponent', () => {
  let component: ViewUploadedDocumentComponent;
  let fixture: ComponentFixture<ViewUploadedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUploadedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
