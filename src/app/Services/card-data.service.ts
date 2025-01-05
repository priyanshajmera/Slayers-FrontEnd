import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  constructor() { }

  private readonly storageKey = 'ootdData';

  private cardData = [];

  setCardData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.cardData = data;
  }

  getCardData(): any[] {
    const data = JSON.parse(localStorage.getItem(this.storageKey)!);
    return data;
  }
}
