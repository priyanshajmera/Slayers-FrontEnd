import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Slayers-FrontEnd';

  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/landing']);
  }

  isLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
    // Returns true if the token exists
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const expiry = payload.exp; // Extract the `exp` field
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      return now > expiry; // Check if the current time is past the expiry time
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Treat errors as expired tokens
    }
  }

  redirectTologin() {
    this.router.navigate(['/login']);
  }
}
