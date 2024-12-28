import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutfitComponent } from './edit-outfit.component';

describe('EditOutfitComponent', () => {
  let component: EditOutfitComponent;
  let fixture: ComponentFixture<EditOutfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOutfitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
