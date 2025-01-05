import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OotdService {
  apiUrl =environment.apiUrl;
  private readonly storageKey = 'apiData';

  constructor(private http:HttpClient) { }

  ootdSuggestion(request: any): any {
    return this.http.post(`${this.apiUrl}/ootd`, request);

  }
  // Save data to localStorage
  saveData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Retrieve data from localStorage
  getData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Clear data from localStorage
  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
