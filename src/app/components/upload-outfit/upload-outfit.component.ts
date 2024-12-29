import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-outfit',
  templateUrl: './upload-outfit.component.html',
  styleUrl: './upload-outfit.component.css',
})
export class UploadOutfitComponent {
  uploadForm: FormGroup;
  uploadError: string | null = null;
  uploadSuccess: string | null = null;

  private apiUrl = 'http://localhost:3000/upload'; // Replace with your API endpoint

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      image: [null, Validators.required],
      category: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.uploadForm.patchValue({ image: input.files[0] });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();

      formData.append('image', this.uploadForm.get('image')!.value);
      formData.append('category', this.uploadForm.get('category')!.value);
      formData.append('tags', this.uploadForm.get('tags')!.value || '');

      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          this.uploadSuccess = 'Outfit uploaded successfully!';
          this.uploadForm.reset();
        },
        error: (err: any) => {
          this.uploadError =
            err.error?.message || 'Upload failed. Please try again.';
        },
      });
    }
  }
}
