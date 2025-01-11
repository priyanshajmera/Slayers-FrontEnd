import { Component, HostListener } from '@angular/core';
import { WardrobeService } from '../../Services/wardrobe.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrl: './wardrobe.component.css'
})
export class WardrobeComponent {

  wardrobe: { [category: string]: any[] } = {};
  error: string | null = null;
  currentIndex: number[] = [];
  isMobileView: boolean = false;

  constructor(private wardrobeService: WardrobeService,private router:Router) {}

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
        this.currentIndex = Object.keys(this.wardrobe).map(() => 0);
      },
      error: (err:any) => {
        this.error = 'Failed to load wardrobe. Please try again.';
      },
    });
  }

  deleteOutfit(id: number): void {
    if (confirm('Are you sure you want to delete this outfit?')) {
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
    
  }

  editOutfit(id: number): void {
    this.router.navigate(['/edit-outfit', id]);
    // Implement navigation or inline editing logic as needed
  }

  getItemsPerPage(): number {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 4; // Large screens (>=1280px)
    } else if (screenWidth >= 768) {
      return 3; // Medium screens (>=768px)
    } else {
      return 1; // Small screens (<768px)
    }
  }

  prevSlide(categoryIndex: number, totalItems: number): void {
    const itemsPerPage = this.getItemsPerPage();
    // Prevent scrolling before the first item
    if (this.currentIndex[categoryIndex] > 0) {
      this.currentIndex[categoryIndex]--;
    }
  }
  
  nextSlide(categoryIndex: number, totalItems: number): void {
    const itemsPerPage = this.getItemsPerPage();
    // Prevent scrolling past the last visible group of items
    const maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);
    if (this.currentIndex[categoryIndex] < maxIndex) {
      this.currentIndex[categoryIndex]++;
    }
  }

  // Update the carousel when the screen size changes
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // Reset currentIndex for all categories when resizing to ensure correct view
    this.currentIndex = this.currentIndex.map(() => 0);
  }

  // Detect screen size and set `isMobileView`
  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    this.isMobileView = window.innerWidth < 768;
  }

  // Handle scroll event on mobile (Optional: You can track scroll progress here)
  onScroll(categoryIndex: number, totalItems: number): void {
    console.log('Scrolling category:', categoryIndex);
  }

}
