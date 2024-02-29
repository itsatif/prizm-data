import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWeServeComponent } from './client-we-serve.component';

describe('ClientWeServeComponent', () => {
  let component: ClientWeServeComponent;
  let fixture: ComponentFixture<ClientWeServeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWeServeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientWeServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
