import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-outfit',
  templateUrl: './edit-outfit.component.html',
  styleUrls: ['./edit-outfit.component.css'],
})
export class EditOutfitComponent implements OnInit {
  editForm: FormGroup;
  outfitId: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private apiUrl = 'http://localhost:3000/outfits'; // Replace with your API endpoint

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      tags: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.outfitId = Number(params.get('id'));
      if (this.outfitId) {
        this.fetchOutfitDetails(this.outfitId);
      }
    });
  }

  fetchOutfitDetails(id: number): void {
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (outfit: any) => {
        this.editForm.patchValue({
          tags: outfit.tags || '',
          category: outfit.category || '',
        });
      },
      error: () => {
        this.errorMessage = 'Failed to fetch outfit details. Please try again.';
      },
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.outfitId !== null) {
      const formData = this.editForm.value;
      this.http.put(`${this.apiUrl}/${this.outfitId}`, formData).subscribe({
        next: () => {
          this.successMessage = 'Outfit updated successfully!';
          this.router.navigate(['/wardrobe']);
        },
        error: () => {
          this.errorMessage = 'Failed to update outfit. Please try again.';
        },
      });
    }
  }

  deleteOutfit(): void {
    if (this.outfitId !== null) {
      this.http.delete(`${this.apiUrl}/${this.outfitId}`).subscribe({
        next: () => {
          alert('Outfit deleted successfully');
          this.router.navigate(['/wardrobe']);
        },
        error: () => {
          alert('Failed to delete outfit. Please try again.');
        },
      });
    }
  }
}
