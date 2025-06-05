import { Component, inject } from '@angular/core';
import { ProductsService } from '../../data/products.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styles: ``
})
export default class ProductListComponent {

  private readonly _productsService = inject(ProductsService);
  productList: Product[] = [];

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (data) => {
        this.productList = data;
        console.log('Products fetched successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }


}
