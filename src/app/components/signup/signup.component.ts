import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  signupError: string | null = null;

  private apiUrl = 'http://localhost:3000/signup'; // Replace with your API endpoint

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      // Perform API call to register the user
      this.http
        .post(this.apiUrl, { username, email, password })
        .subscribe({
          next: () => {
            alert('Signup successful!');
            this.router.navigate(['/login']);
          },
          error: (error:any) => {
            this.signupError = error.error?.message || 'Signup failed. Please try again.';
          },
        });
    }
  }

}
