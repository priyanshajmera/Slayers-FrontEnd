import { Component } from '@angular/core';
import { OotdService } from '../../Services/ootd.service';
import { CardDataService } from '../../Services/card-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ootd',
  templateUrl: './ootd.component.html',
  styleUrl: './ootd.component.css',
})
export class OOTDComponent {
  constructor(
    private ootdService: OotdService,
    private cartDataSerice: CardDataService,
    private router: Router
  ) {}
  categories = [
    {
      id: 0,
      title: 'Occasion',
      tags: [
        { name: 'Casual Outing', selected: false },
        { name: 'Work or Formal', selected: false },
        { name: 'Party', selected: false },
        { name: 'Date', selected: false },
        { name: 'Workout', selected: false },
        { name: 'Vacation', selected: false },
      ],
    },
    {
      id: 1,
      title: 'Weather',
      tags: [
        { name: 'Hot/Sunny', selected: false },
        { name: 'Rainy', selected: false },
        { name: 'Cold/Winter', selected: false },
        { name: 'Mild/Autumn', selected: false },
        { name: 'Spring', selected: false },
      ],
    },
    {
      id: 2,
      title: 'Personal Style',
      tags: [
        { name: 'Classic', selected: false },
        { name: 'Boho', selected: false },
        { name: 'Minimalistic', selected: false },
        { name: 'Trendy', selected: false },
        { name: 'Sporty', selected: false },
        { name: 'Edgy', selected: false },
        { name: 'Elegant', selected: false },
      ],
    },
    {
      id: 3,
      title: 'Comfort Level',
      tags: [
        { name: 'High Comfort', selected: false },
        { name: 'Balanced', selected: false },
        { name: 'Low Comfort (for special occasions)', selected: false },
      ],
    },
    {
      id: 4,
      title: 'Color Preferences',
      tags: [
        { name: 'Preferred Colors', selected: false },
        { name: 'Avoided Colors', selected: false },
        { name: 'Seasonal Colors', selected: false },
      ],
    },
    {
      id: 5,
      title: 'Body Fit',
      tags: [
        { name: 'Loose Fit', selected: false },
        { name: 'Fitted', selected: false },
        { name: 'Cropped', selected: false },
        { name: 'High-Waisted', selected: false },
        { name: 'A-line', selected: false },
        { name: 'Relaxed', selected: false },
      ],
    },
    {
      id: 6,
      title: 'Extra',
      tags: [
        { name: 'Modest Clothing', selected: false },
        { name: 'Traditional Wear', selected: false },
        { name: 'Head Covering', selected: false },
        { name: 'Festive Attire', selected: false },
      ],
    },
    {
      id: 7,
      title: 'Mood',
      tags: [
        { name: 'Confident', selected: false },
        { name: 'Relaxed', selected: false },
        { name: 'Bold', selected: false },
        { name: 'Elegant', selected: false },
        { name: 'Playful', selected: false },
      ],
    },
    {
      id: 8,
      title: 'Time of Day',
      tags: [
        { name: 'Daytime', selected: false },
        { name: 'Evening', selected: false },
        { name: 'Morning', selected: false },
        { name: 'Night', selected: false },
      ],
    },
  ];
  outfits = [];
  toggleSelection(tag: any): void {
    tag.selected = !tag.selected;
  }

  getSelectedTags(): any[] {
    const selectedTags: any[] = [];
    this.categories.forEach((category) => {
      category.tags
        .filter((tag) => tag.selected) // Get only selected tags
        .forEach((tag) => {
          selectedTags.push({
            id: category.id,
            category: category.title,
            tag: tag.name,
          });
        });
    });
    return selectedTags;
  }

  sendSelectedTagsToBackend(): void {
    const selectedTags = this.getSelectedTags();
    //api call to send selected tags to backend
    this.ootdService.ootdSuggestion(selectedTags).subscribe({
      next: (response: any) => {
        this.outfits = response;
        const formattedCards = Object.keys(this.outfits).map((key: any) => ({
          title: key,
          items: this.outfits[key],
        }));
        this.cartDataSerice.setCardData(formattedCards);
        this.router.navigate(['/ootd-suggestions']);
      },
      error: (err: any) => {
        console.error('Failed to get outfit suggestions:', err);
      },
    });
  }
}
