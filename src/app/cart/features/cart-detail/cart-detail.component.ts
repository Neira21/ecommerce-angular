import { Component, inject } from '@angular/core';
import { CartService } from '../../data/cart.service';
import { ProductInCart } from '../../../shared/interfaces/product.interface';
import { StorageService } from '../../../shared/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-detail.component.html',
  styles: ``,
})
export default class CartDetailComponent {
  private readonly _cartService = inject(CartService);
  cart: ProductInCart[] = [];

  ngOnInit(): void {


    this._cartService.syncCartWithStorage();

    this._cartService.cartItems$.subscribe((cart) => {
      console.log('📦 Carrito recibido en CartDetailComponent:', cart); // 👈 DEBE imprimir los 3 productos
      this.cart = cart;
    });
  }
}
