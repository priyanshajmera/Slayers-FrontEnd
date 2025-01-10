import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-upload-outfit',
  templateUrl: './upload-outfit.component.html',
  styleUrl: './upload-outfit.component.css',
})
export class UploadOutfitComponent {
  uploadForm: FormGroup;
  uploadError: string | null = null;
  uploadSuccess: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  subcategories: string[] = [];

  private apiUrl = environment.apiUrl+'/upload'; 
  
  gender=JSON.parse(localStorage.getItem('userInfo')!).gender;
  categorySubcategories: { [key: string]: string[] } = {
    Top: ['T-shirt', 'Shirt', 'Jacket'],
    Bottom: ['Jeans', 'Trousers', 'Shorts'],
    Dress: ['Gown', 'Party Dress', 'Casual Dress'],
    Accessories: ['Belt', 'Hat', 'Scarf'],
  };

  categorySubcategoriesfemale:{ [key: string]: string[] } ={
    Top: ['bra', 'bra1', 'bra2'],
    Bottom: ['Jeans', 'Trousers', 'Shorts'],
    Dress: ['Gown', 'Party Dress', 'Casual Dress'],
    Accessories: ['Belt', 'Hat', 'Scarf'],
  }

  categorySubcategoriesOther:{ [key: string]: string[] } ={
    Top: ['T-shirt', 'Shirt', 'Jacket'],
    Bottom: ['Jeans', 'Trousers', 'Shorts'],
    Dress: ['Gown', 'Party Dress', 'Casual Dress'],
    Accessories: ['Belt', 'Hat', 'Scarf'],
  }

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.uploadForm = this.fb.group({
      image: [null, Validators.required],
      category: ['', Validators.required],
      subcategory: ['',Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.uploadForm.patchValue({ image: file });
      this.uploadForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCategoryChange(category: keyof typeof this.categorySubcategories): void {
    if(String(this.gender).toLowerCase()=="male"){
      this.subcategories=this.categorySubcategories[category] || [];
    }else if(String(this.gender).toLowerCase()=="female"){
      this.subcategories=this.categorySubcategoriesfemale[category] || [];
    }
    else{
      this.subcategories=this.categorySubcategoriesOther[category] || [];
    }
    
    this.uploadForm.patchValue({ subcategory: '' }); // Reset subcategory when category changes
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();

      formData.append('image', this.uploadForm.get('image')!.value);
      formData.append('category', this.uploadForm.get('category')!.value);
      formData.append('subcategory',this.uploadForm.get('subcategory')!.value)
      formData.append('tags', this.uploadForm.get('tags')!.value || '');

      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          this.uploadSuccess = 'Outfit uploaded successfully!';
          this.uploadForm.reset();
          this.router.navigate(['/wardrobe']);
        },
        error: (err: any) => {
          this.uploadError =
            err.error?.message || 'Upload failed. Please try again.';
        },
      });
    }
  }
}
