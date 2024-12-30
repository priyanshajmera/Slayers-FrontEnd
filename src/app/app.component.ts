import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Slayers-FrontEnd';
  
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/landing']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if the token exists
  }
}
