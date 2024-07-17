import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/Product';
import { ProductComponent } from './product/product.component';
import { Category } from '../../types/Category';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  items: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  showUserProducts: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.productService.getViewBasedProducts();
    this.productService.viewBasedProducts.subscribe((products) => {
      this.items = products;
    });
  }

  onUserClick(showUserProducts: boolean) {
    this.showUserProducts = showUserProducts;
    this.authService.getUserDetails().subscribe((userDetails) => {
      this.productService.getViewBasedProducts({
        userId: this.showUserProducts ? userDetails?.id : '',
        category: this.selectedCategory,
      });
    });
  }
  onCategoryClick(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = category;
    }
    this.authService.getUserDetails().subscribe((userDetails) => {
      this.productService.getViewBasedProducts({
        userId: this.showUserProducts ? userDetails?.id : '',
        category: this.selectedCategory,
      });
    });
  }

  // onCategoryChange(category: string) {
  //   this.productService.getViewBasedProducts('category', { category });
  // }
  // onViewChange(view: 'user' | 'all', userId?: string) {
  //   this.productService.getViewBasedProducts(view, { userId });
  // }
}
