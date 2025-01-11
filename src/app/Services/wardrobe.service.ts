import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WardrobeService {
  private baseUrl = environment.apiUrl;

  categorySubcategories: { [key: string]: string[] } = {
    Top: ['T-Shirt', 'Shirt', 'Jacket', 'Sweater', 'Sweatshirt'],
    Bottom: ['Jeans', 'Trousers', 'Shorts', 'Formal Pants', 'Track Pants', 'Joggers'],
    Dress: ['Kurta', 'Sherwani', 'Nehru Jacket', '2 Piece Suit', 'Piece suit'],
    Accessories: ['Watch', 'Sunglass'],
    Footwear: [
      'Casual Shoe',
      'Sports Shoe',
      'Sneaker',
      'Sandal',
      'Formal Shoe',
      'Flip Flop',
    ],
  };

  categorySubcategoriesfemale: { [key: string]: string[] } = {
    Top: [
      'Tops',
      'Shirt',
      'T-Shirt',
      'Jacket/Coat',
      'Shrugs',
      'Sweater’, ‘Sweatshirt',
    ],
    Bottom: [
      'Jeans',
      'Trousers',
      'Capris',
      'Skirts',
      'Shorts',
      'Leggings',
      'Palazzos',
    ],
    Dress: [
      'Kurtas/Suits',
      'Saree',
      'Lehenga Cholis',
      'Playsuits',
      'Jumpsuits',
    ],
    Accessories: ['Watch', 'Sunglass', 'Handbag', 'Jewellery', 'Scarves'],
    Footwear: ['Flat', 'Heel', 'Boot', 'Casual Shoes', 'Sneaker', 'Sandal'],
  };

  categorySubcategoriesOther: { [key: string]: string[] } = {
    Top: ['Tops','Shirt',  'T-Shirt', 'Jacket/Coat', 'Shrugs', 'Sweater’, ‘Sweatshirt'],
  Bottom: ['Jeans', 'Trousers’,’ Capris', 'Skirts', 'Shorts', 'Leggings', 'Palazzos', 'Formal Pant', 'Track Pant', 'Jogger' ],
  Dress: ['Kurtas/Suits', 'Saree', 'Lehenga Cholis', 'Playsuits', 'Jumpsuits','Sherwani', 'Nehru Jacket', '2 Piece Suit','Piece suit'],
  Accessories: ['Watch', 'Sunglass', 'Handbag', 'Jewellery', 'Scarves'],
  Footwear: ['Flat', 'Heel', 'Boot','Casual Shoe', 'Sports Shoe', 'Sneaker', 'Sandal', 'Formal Shoe','Flip Flop']

  };

  constructor(private http: HttpClient) {}

  getWardrobe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wardrobe`);
  }

  deleteOutfit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/outfits/${id}`);
  }

  getSubcategories() {
    return [
      this.categorySubcategories,
      this.categorySubcategoriesfemale,
      this.categorySubcategoriesOther,
    ];
  }
}
