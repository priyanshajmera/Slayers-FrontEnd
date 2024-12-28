import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOutfitComponent } from './upload-outfit.component';

describe('UploadOutfitComponent', () => {
  let component: UploadOutfitComponent;
  let fixture: ComponentFixture<UploadOutfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadOutfitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
