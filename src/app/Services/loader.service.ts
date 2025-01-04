import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this._isLoading.asObservable();

  show(): void {
    this._isLoading.next(true);
  }

  hide(): void {
    this._isLoading.next(false);
  }
}
