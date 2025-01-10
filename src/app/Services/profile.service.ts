import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  apiurl=environment.apiUrl+'/profile';

  fetchProfile(){
    return this.http.get(this.apiurl);
  }

  updateProfile(userData:any){
    return this.http.put(this.apiurl,userData);
  }
}
