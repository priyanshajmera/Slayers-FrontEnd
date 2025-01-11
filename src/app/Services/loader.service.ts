import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loading = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('Loading...');

  isLoading$ = this.loading.asObservable();
  message$ = this.message.asObservable();

  show(message?: string): void {
    if (message) {
      this.message.next(message);
    } else {
      this.message.next('Loading...'); // Default message
    }
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }
}
