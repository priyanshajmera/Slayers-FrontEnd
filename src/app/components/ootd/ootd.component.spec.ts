import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OOTDComponent } from './ootd.component';

describe('OOTDComponent', () => {
  let component: OOTDComponent;
  let fixture: ComponentFixture<OOTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OOTDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OOTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
