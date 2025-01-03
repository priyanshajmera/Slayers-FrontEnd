import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  constructor() { }

  private cardData = [];

  setCardData(data: any): void {
    this.cardData = data;
  }

  getCardData(): any[] {
    return this.cardData;
  }
}
