import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/Product';
import { ProductComponent } from './product/product.component';
import { Category } from '../../types/Category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  items: Product[] = [];
  categories: Category[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.items = products));
    this.productService.allCategories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategoryChange(category: string) {
    this.productService.getViewBasedProducts('category', { category });
  }
  onViewChange(view: 'user' | 'all', userId?: string) {
    this.productService.getViewBasedProducts(view, { userId });
  }
}
