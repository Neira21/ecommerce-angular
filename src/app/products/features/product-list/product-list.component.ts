import { CartStateService } from './../../../cart/data/cart-state.service';
import { Component, inject, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { ProductStateService } from '../../data/product-state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers: [ProductStateService, CartStateService]
})
export default class ProductListComponent {

  productsState = inject(ProductStateService);
  cartState = inject(CartStateService).state;


  addToCard = output<Product>();

  add(product:Product) {

    this.cartState.add({
      product,
      quantity: 1}
    );
  }

}
