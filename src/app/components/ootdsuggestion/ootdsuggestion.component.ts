import { Component } from '@angular/core';
import { CardDataService } from '../../Services/card-data.service';

@Component({
  selector: 'app-ootdsuggestion',
  templateUrl: './ootdsuggestion.component.html',
  styleUrl: './ootdsuggestion.component.css'
})
export class OOTDSuggestionComponent {
  constructor(private cardDataService:CardDataService) {}
  currentCardIndex = 0;
  cards:any;
  
  ngOnInit(): void {
    this.cards = this.cardDataService.getCardData();
  }

  nextCard(): void {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
    }
  }

  prevCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  regenerateCards(): void {
    this.currentCardIndex = 0;
  }

}
