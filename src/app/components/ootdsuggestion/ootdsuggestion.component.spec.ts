import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OOTDSuggestionComponent } from './ootdsuggestion.component';

describe('OOTDSuggestionComponent', () => {
  let component: OOTDSuggestionComponent;
  let fixture: ComponentFixture<OOTDSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OOTDSuggestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OOTDSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
