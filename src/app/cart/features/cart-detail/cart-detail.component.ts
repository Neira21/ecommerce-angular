import { Component, inject } from '@angular/core';
//import { CartService } from '../../data/cart.service';
import { ProductInCart } from '../../../shared/interfaces/product.interface';
import { StorageService } from '../../../shared/storage/storage.service';
import { CommonModule } from '@angular/common';
import { CartStateService } from '../../data/cart-state.service';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-detail.component.html',
  styles: ``,
})
export default class CartDetailComponent {

  state = inject(CartStateService).state;

  total = inject(CartStateService).total;


  get stateCart() {
    return this.state(); // ✅ Esto es reactivo
  }

  eliminarDelCarrito(producto: ProductInCart) {
    this.state.remove(producto); // Triggerea la acción
  }

  incrementarCantidad(producto: ProductInCart) {
    this.state.increment(producto);
  }

  decrementarCantidad(producto: ProductInCart) {
    this.state.decrement(producto);
  }



}
