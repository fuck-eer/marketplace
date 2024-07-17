import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() productName: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
  @Input() img: string = '';
  @Input() category: string = '';
  categoryClass: string = '';

  constructor() {}

  ngOnInit() {
    switch (this.category) {
      case 'sports':
        this.categoryClass = 'category sports';
        break;
      case 'utility':
        this.categoryClass = 'category utility';
        break;
      case 'comfort':
        this.categoryClass = 'category comfort';
        break;
      case 'electronics':
        this.categoryClass = 'category electronics';
        break;
      default:
        this.categoryClass = 'category others';
        break;
    }
  }
}
