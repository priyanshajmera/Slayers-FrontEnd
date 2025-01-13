import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router service
  const token = localStorage.getItem('token');

  if (token && !isTokenExpired(token)) {
    return true; // Allow access if the token is valid and not expired
  }
  return router.navigate(['/login']); // Redirect to login if not authenticated
};

// Helper function to check if the token is expired
function isTokenExpired(token: string): boolean {
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
