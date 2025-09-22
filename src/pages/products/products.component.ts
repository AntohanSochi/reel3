
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDataService } from '../../services/product-data.service';
import { Product } from '../../models/product.model';
// This component would be created to handle the generation modal
// import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule], // Add ProductModalComponent here when it's created
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productDataService = inject(ProductDataService);
  products = this.productDataService.products;

  selectedProduct = signal<Product | null>(null);

  openProductModal(product: Product) {
    this.selectedProduct.set(product);
    // Logic to open a modal would go here.
    // For this example, we'll just log it.
    console.log('Opening modal for:', product.name);
  }
  
  closeModal() {
    this.selectedProduct.set(null);
  }
}
