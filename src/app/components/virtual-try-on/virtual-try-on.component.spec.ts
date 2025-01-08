import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTryOnComponent } from './virtual-try-on.component';

describe('VirtualTryOnComponent', () => {
  let component: VirtualTryOnComponent;
  let fixture: ComponentFixture<VirtualTryOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirtualTryOnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualTryOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
