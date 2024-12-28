import { Component } from '@angular/core';
import { WardrobeService } from '../../Services/wardrobe.service';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrl: './wardrobe.component.css'
})
export class WardrobeComponent {

  wardrobe: { [category: string]: any[] } = {};
  error: string | null = null;

  constructor(private wardrobeService: WardrobeService) {}

  ngOnInit(): void {
    this.loadWardrobe();
  }

  loadWardrobe(): void {
    this.wardrobeService.getWardrobe().subscribe({
      next: (data: any[]) => {
        this.wardrobe = data.reduce((acc, outfit) => {
          if (!acc[outfit.category]) acc[outfit.category] = [];
          acc[outfit.category].push(outfit);
          return acc;
        }, {});
      },
      error: (err:any) => {
        this.error = 'Failed to load wardrobe. Please try again.';
      },
    });
  }

  deleteOutfit(id: number): void {
    this.wardrobeService.deleteOutfit(id).subscribe({
      next: () => {
        alert('Outfit deleted successfully');
        this.loadWardrobe();
      },
      error: () => {
        alert('Failed to delete outfit. Please try again.');
      },
    });
  }

  editOutfit(id: number): void {
    alert(`Redirecting to edit page for outfit ID: ${id}`);
    // Implement navigation or inline editing logic as needed
  }

}
