import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/Product';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../types/Category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiURL = 'http://localhost:5000/products';
  public categoriesApiURL = 'http://localhost:5000/categories';
  public viewBasedProducts = new BehaviorSubject<Product[]>([]);
  public allCategories = new BehaviorSubject<Category[]>([]);
  constructor(private http: HttpClient) {}

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiURL, product);
  }
  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }
  getCategories() {
    return this.http
      .get<Category[]>(`${this.categoriesApiURL}`)
      .subscribe((categories) => {
        console.log(categories);

        this.allCategories.next(categories);
      });
  }
  getViewBasedProducts(
    viewBy: 'user' | 'all' | 'category' = 'all',
    options?: { userId?: string; category?: string }
  ) {
    if (viewBy === 'user') {
      return this.http
        .get<Product[]>(`${this.apiURL}`)
        .subscribe((products) => {
          this.viewBasedProducts.next(
            products.filter((product) => product.ownerId === options?.userId)
          );
        });
    } else if (viewBy === 'category') {
      return this.http
        .get<Product[]>(`${this.apiURL}`)
        .subscribe((products) => {
          this.viewBasedProducts.next(
            products.filter(
              (product) => product.categoryId === options?.category
            )
          );
        });
    } else {
      return this.http
        .get<Product[]>(`${this.apiURL}`)
        .subscribe((products) => {
          this.viewBasedProducts.next(products);
        });
    }
  }
}
