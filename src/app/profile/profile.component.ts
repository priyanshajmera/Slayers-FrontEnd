import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  showPasswordSection = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  errorMessage: string | null = null;
  isError:boolean=false;

  constructor(private fb: FormBuilder,private profileService:ProfileService) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [{ value: 'test@test.com', disabled: true }],
      mobile: [''],
      gender:['', Validators.required],
      dob:['', Validators.required],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
    });
  }
  ngOnInit(): void {
    this.profileService.fetchProfile().subscribe({
      next: (response: any) => {
        this.profileForm.patchValue(response);
        
      },
      error: (err) => {
        this.isError=true;
        this.errorMessage = 'Failed to load profile. Please try again.';
      }
    })
  }

  togglePasswordSection() {
    this.showPasswordSection = !this.showPasswordSection;
  }

  toggleVisibility(field: string) {
    if (field === 'current') this.showCurrentPassword = !this.showCurrentPassword;
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.profileForm.value;

      if (newPassword !== confirmPassword) {
        this.isError=true;
        this.errorMessage = 'New passwords do not match!';
        
        return;
      }
      this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: (response) => {
          this.profileForm.patchValue(response);
        },
        error: (err) => {
          this.isError=true;
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      })
      //call api to update user profile

      console.log('Form data:', this.profileForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
