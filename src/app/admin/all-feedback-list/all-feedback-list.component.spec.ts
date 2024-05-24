import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedbackListComponent } from './all-feedback-list.component';

describe('AllFeedbackListComponent', () => {
  let component: AllFeedbackListComponent;
  let fixture: ComponentFixture<AllFeedbackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFeedbackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
