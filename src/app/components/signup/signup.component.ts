import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  signupError: string | null = null;

  private apiUrl = environment.apiUrl+'/signup'; // Replace with your API endpoint

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      gender:['', Validators.required],
      dob:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      // Perform API call to register the user
      this.http
        .post(this.apiUrl,this.signupForm.value)
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

  validateNumericInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      // If not a number, prevent the input
      event.preventDefault();
    }
  }

}
