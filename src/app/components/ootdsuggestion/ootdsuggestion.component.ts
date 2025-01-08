import { Component } from '@angular/core';
import { CardDataService } from '../../Services/card-data.service';
import { Router } from '@angular/router';
import { OotdService } from '../../Services/ootd.service';


@Component({
  selector: 'app-ootdsuggestion',
  templateUrl: './ootdsuggestion.component.html',
  styleUrl: './ootdsuggestion.component.css'
})
export class OOTDSuggestionComponent {
  constructor(private cardDataService:CardDataService,private router:Router,private ootsService:OotdService) {}
  currentCardIndex = 0;
  cards:any;
  
  ngOnInit(): void {
    
    this.cards = this.cardDataService.getCardData();
    console.log('cards',this.cards);
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

  navigateToVirtualTryOn(top:string,bottom:string): void {
    // Navigate to Virtual Try On page
    console.log( top,bottom); 
    this.ootsService.getTryOnData(top,bottom).subscribe({
      next:(response:any)=>{
        this.router.navigate(['/virtualtryon'], {
          state:  {response:response} },
        );
      }
    });
    
  }

}
