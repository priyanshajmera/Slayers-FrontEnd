import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWardrobe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wardrobe`);
  }

  deleteOutfit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/outfits/${id}`);
  }
}
