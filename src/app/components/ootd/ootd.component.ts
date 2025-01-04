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
        { name: 'Work/Formal', selected: false },
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
        { name: 'Hot', selected: false },
        { name: 'Rainy', selected: false },
        { name: 'Cold', selected: false },
      ],
    },
    {
      id: 2,
      title: 'Personal Style',
      tags: [
        { name: 'Classic', selected: false },
        { name: 'Minimalistic', selected: false },
        { name: 'Trendy', selected: false },
        { name: 'Sporty', selected: false },
        { name: 'Elegant', selected: false },
      ],
    },
    {
      id: 3,
      title: 'Body Fit',
      tags: [
        { name: 'Loose', selected: false },
        { name: 'Fitted', selected: false },
        { name: 'Relaxed', selected: false },
      ],
    },
    {
      id: 4,
      title: 'Time of Day',
      tags: [
        { name: 'Daytime', selected: false },
        { name: 'Evening', selected: false },
        { name: 'Morning', selected: false },
        { name: 'Night', selected: false },
      ],
    },
    {
      id: 5,
      title: 'Layering with other clothes?',
      tags: [
        { name: 'Yes', selected: false },
        { name: 'No', selected: false },
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
