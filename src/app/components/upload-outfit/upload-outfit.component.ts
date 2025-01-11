import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { WardrobeService } from '../../Services/wardrobe.service';
import { LoaderService } from '../../Services/loader.service';

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
  categorySubcategories: { [key: string]: string[] } = {};
  categorySubcategoriesfemale:{ [key: string]: string[] } ={};
  categorySubcategoriesOther:{ [key: string]: string[] } ={};

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router,private wardrobeService:WardrobeService,private loaderService:LoaderService) {
    this.uploadForm = this.fb.group({
      image: [null, Validators.required],
      category: ['', Validators.required],
      subcategory: ['',Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
    var subcategoryData=this.wardrobeService.getSubcategories();
    this.categorySubcategories=subcategoryData[0];
    this.categorySubcategoriesfemale=subcategoryData[1];
    this.categorySubcategoriesOther=subcategoryData[2];
  }

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
      this.loaderService.show('Uploading...');
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
        complete:()=>{
          this.loaderService.hide();
        }
      });
    }
  }
}
