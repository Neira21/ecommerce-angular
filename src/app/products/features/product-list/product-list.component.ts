import { Component, inject } from '@angular/core';
import { ProductsService } from '../../data/products.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/data/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styles: ``
})
export default class ProductListComponent {

  private readonly _productsService = inject(ProductsService);
  private readonly _cartService= inject(CartService); // Assuming you meant to inject CartService here

  productList: Product[] = [];

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(product: Product): void {
    this._cartService.addToCart(product);
  }


}
