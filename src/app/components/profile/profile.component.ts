import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm: FormGroup;
  showPasswordSection = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  errorMessage: string | null = null;
  isError: boolean = false;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [{ value: 'test@test.com', disabled: true }],
      phone: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
      profileimageurl: [null],
    });
  }
  ngOnInit(): void {
    this.profileService.fetchProfile().subscribe({
      next: (response: any) => {
        const transformedResponse = {
          ...response,
          dob: this.formatDateForInput(response.dob), // Format the dob field
        };
        this.profileForm.patchValue(transformedResponse);
      },
      error: (err) => {
        this.isError = true;
        this.errorMessage = 'Failed to load profile. Please try again.';
      },
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  togglePasswordSection() {
    this.showPasswordSection = !this.showPasswordSection;
  }

  toggleVisibility(field: string) {
    if (field === 'current')
      this.showCurrentPassword = !this.showCurrentPassword;
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    if (field === 'confirm')
      this.showConfirmPassword = !this.showConfirmPassword;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      // Restrict to JPEG and PNG
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Only JPEG and PNG files are allowed!';
        this.profileForm.patchValue({ profileimageurl: null }); // Reset the form field
        this.previewUrl = null; // Reset the preview URL
        return;
      }

      // Update form control
      this.profileForm.patchValue({ profileimageurl: file });
      this.profileForm.get('profileimageurl')?.updateValueAndValidity();

      // Generate preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);

      // Clear any previous error message
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const { currentPassword, newPassword, confirmPassword } =
        this.profileForm.value;

      if (newPassword !== confirmPassword) {
        this.isError = true;
        this.errorMessage = 'New passwords do not match!';

        return;
      }
      const formData = new FormData();
      formData.append(
        'profileimageurl',
        this.profileForm.get('profileimageurl')!.value
      );
      formData.append('username', this.profileForm.get('username')!.value);
      formData.append('email', this.profileForm.get('email')!.value);
      formData.append('gender', this.profileForm.get('gender')!.value);
      formData.append('dob', this.profileForm.get('dob')!.value);
      formData.append(
        'currentPassword',
        this.profileForm.get('currentPassword')!.value
      );
      formData.append(
        'newPassword',
        this.profileForm.get('newPassword')!.value
      );
      formData.append(
        'confirmPassword',
        this.profileForm.get('confirmPassword')!.value
      );

      this.profileService.updateProfile(formData).subscribe({
        next: (response:any) => {
          this.profileForm.patchValue(response);
          localStorage.setItem('userInfo',JSON.stringify(response.user));
          this.errorMessage = '';
        },
        error: (err) => {
          this.isError = true;
          this.errorMessage = 'Failed to update profile. Please try again.';
        },
      });
      //call api to update user profile

      console.log('Form data:', this.profileForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
