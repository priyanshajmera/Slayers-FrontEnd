import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { WardrobeService } from '../../Services/wardrobe.service';

@Component({
  selector: 'app-edit-outfit',
  templateUrl: './edit-outfit.component.html',
  styleUrls: ['./edit-outfit.component.css'],
})
export class EditOutfitComponent implements OnInit {
  outfit: any = {
    id: null,
    name: 'White Sneakers',
    image_url: 'assets/images/uploadPic.jpeg',
    tags: 'Casual, denim',
    category: 'Accessories',
    description: 'Description Unavailable',
    subcategory: '',
  };

  private apiUrl = environment.apiUrl + '/outfits';
  subcategories: string[] = [];
  originalCategory: string = '';
  orginalSubCategory: string = '';
  gender = JSON.parse(localStorage.getItem('userInfo')!).gender;
  categorySubcategories: { [key: string]: string[] } = {};
  categorySubcategoriesfemale: { [key: string]: string[] } = {};
  categorySubcategoriesOther: { [key: string]: string[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private wardrobeService: WardrobeService
  ) {}

  ngOnInit(): void {
    const outfitId = this.route.snapshot.paramMap.get('id');
    if (outfitId) {
      var subcategoryData = this.wardrobeService.getSubcategories();
      this.categorySubcategories = subcategoryData[0];
      this.categorySubcategoriesfemale = subcategoryData[1];
      this.categorySubcategoriesOther = subcategoryData[2];

      this.loadOutfit(outfitId);
    }
  }

  onCategoryChange(category: keyof typeof this.categorySubcategories): void {
    if (String(this.gender).toLowerCase() == 'male') {
      this.subcategories = this.categorySubcategories[category] || [];
    } else if (String(this.gender).toLowerCase() == 'female') {
      this.subcategories = this.categorySubcategoriesfemale[category] || [];
    } else {
      this.subcategories = this.categorySubcategoriesOther[category] || [];
    }
    if (this.originalCategory != category) {
      this.outfit.subcategory = '';
    } else {
      this.outfit.subcategory = this.orginalSubCategory;
    }
  }

  loadOutfit(id: string): void {
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (response: any) => {
        this.outfit = response;
        this.originalCategory = this.outfit.category;
        this.orginalSubCategory = this.outfit.subcategory;
        this.onCategoryChange(this.outfit.category);
      },
      error: (err) => {
        console.error('Failed to load outfit:', err);
      },
    });
  }

  saveChanges(): void {
    this.http.put(`${this.apiUrl}/${this.outfit.id}`, this.outfit).subscribe({
      next: () => {
        alert('Outfit updated successfully!');
        this.router.navigate(['/wardrobe']);
      },
      error: (err) => {
        console.error('Failed to update outfit:', err);
      },
    });
  }

  deleteOutfit(): void {
    if (confirm('Are you sure you want to delete this outfit?')) {
      this.http.delete(`${this.apiUrl}/${this.outfit.id}`).subscribe({
        next: () => {
          alert('Outfit deleted successfully!');
          this.router.navigate(['/wardrobe']);
        },
        error: (err) => {
          console.error('Failed to delete outfit:', err);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/wardrobe']);
  }
}
