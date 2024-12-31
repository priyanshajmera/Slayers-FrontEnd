import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWardrobe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wardrobe`);
  }

  deleteOutfit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/outfits/${id}`);
  }
}
