import { Component, inject } from '@angular/core';
//import { CartService } from '../../data/cart.service';
import { ProductInCart } from '../../../shared/interfaces/product.interface';
import { StorageService } from '../../../shared/storage/storage.service';
import { CommonModule } from '@angular/common';
import { CartStateService } from '../../data/cart-state.service';
import Swal from 'sweetalert2';

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

  limpiarCarrito() {
    const productos = this.stateCart.products;

    // Verificar si el carrito está vacío
    if (productos.length === 0) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Debe agregar productos al carrito antes de pagar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Mostrar la lista de productos para confirmar la compra
    Swal.fire({
      title: '¿Desea realizar la compra?',
      html: `
        <strong>Productos:</strong><br>
        ${productos.map(p => (
          `<div class="flex gap-2">
            <p>${p.product.title}</p>
            <p>${p.quantity}</p>
          </div>`
        )).join('')}
        <strong>Total:</strong><br>
        <p>${this.total()}</p>
      `,
      icon: 'question',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showCloseButton: true,
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        // Si el usuario confirma, limpiar el carrito
        this.state.clear();
        Swal.fire({
          title: 'Compra realizada',
          text: '¡Gracias por su compra!',
          icon: 'success'
        });
      } else {
        // Si cancela, no se hace nada
        Swal.fire({
          title: 'Compra cancelada',
          text: 'No se realizó ninguna compra.',
          icon: 'info'
        });
      }
    });
  }


}
