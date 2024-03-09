import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakToAnExpertComponent } from './speak-to-an-expert.component';

describe('SpeakToAnExpertComponent', () => {
  let component: SpeakToAnExpertComponent;
  let fixture: ComponentFixture<SpeakToAnExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakToAnExpertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeakToAnExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
