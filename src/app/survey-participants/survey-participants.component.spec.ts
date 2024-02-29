import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyParticipantsComponent } from './survey-participants.component';

describe('SurveyParticipantsComponent', () => {
  let component: SurveyParticipantsComponent;
  let fixture: ComponentFixture<SurveyParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyParticipantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
