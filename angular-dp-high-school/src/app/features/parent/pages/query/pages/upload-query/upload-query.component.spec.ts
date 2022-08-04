import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQueryComponent } from './upload-query.component';

describe('UploadQueryComponent', () => {
  let component: UploadQueryComponent;
  let fixture: ComponentFixture<UploadQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
