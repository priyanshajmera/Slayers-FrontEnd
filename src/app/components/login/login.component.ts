import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  private apiUrl = environment.apiUrl+'/signin'; // Replace with your API endpoint

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Perform API call to authenticate the user
      this.http.post(this.apiUrl, { email, password }).subscribe({
        next: (response: any) => {
          // Save the token to localStorage and navigate to home
          localStorage.setItem('token', response.token);
          localStorage.setItem('userInfo',JSON.stringify(response.userDataToSend));
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.loginError =
            error.error?.message || 'Login failed. Please try again.';
        },
      });
    }
  }
}
