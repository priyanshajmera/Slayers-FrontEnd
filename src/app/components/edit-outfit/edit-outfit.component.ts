import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

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
    description:'Description Unavailable'
  };

  private apiUrl = environment.apiUrl+'/outfits';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const outfitId = this.route.snapshot.paramMap.get('id');
    if (outfitId) {
      this.loadOutfit(outfitId);
    }
  }

  loadOutfit(id: string): void {
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (response: any) => {
        this.outfit = response;
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
