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
  constructor(private http: HttpClient) {}

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiURL, product);
  }
  getCategories() {
    return this.http.get<Category[]>(`${this.categoriesApiURL}`);
  }
  getViewBasedProducts(options?: { userId?: string; category?: string }) {
    return this.http.get<Product[]>(`${this.apiURL}`).subscribe((products) => {
      const filteredProducts = products.filter((product) => {
        if (options && options.userId && options.category) {
          return (
            product.ownerId === options.userId &&
            product.categoryId === options.category
          );
        } else if (options && options.userId) {
          return product.ownerId === options.userId;
        } else if (options && options.category) {
          return product.categoryId === options.category;
        } else {
          return true;
        }
      });
      this.viewBasedProducts.next(filteredProducts);
    });
    // if (viewBy === 'user') {
    //   return this.http
    //     .get<Product[]>(`${this.apiURL}`)
    //     .subscribe((products) => {
    //       this.viewBasedProducts.next(
    //         products.filter((product) => product.ownerId === options?.userId)
    //       );
    //     });
    // } else if (viewBy === 'category') {
    //   return this.http
    //     .get<Product[]>(`${this.apiURL}`)
    //     .subscribe((products) => {
    //       this.viewBasedProducts.next(
    //         products.filter(
    //           (product) => product.categoryId === options?.category
    //         )
    //       );
    //     });
    // } else {
    //   return this.http
    //     .get<Product[]>(`${this.apiURL}`)
    //     .subscribe((products) => {
    //       this.viewBasedProducts.next(products);
    //     });
    // }
  }
}
