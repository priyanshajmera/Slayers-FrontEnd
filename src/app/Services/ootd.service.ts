import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OotdService {
  apiUrl =environment.apiUrl;

  constructor(private http:HttpClient) { }

  ootdSuggestion(request: any): any {
    return this.http.post(`${this.apiUrl}/ootd`, request);

  }
}
