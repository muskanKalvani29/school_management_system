import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSidebarComponent } from './parent-sidebar.component';

describe('ParentSidebarComponent', () => {
  let component: ParentSidebarComponent;
  let fixture: ComponentFixture<ParentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
