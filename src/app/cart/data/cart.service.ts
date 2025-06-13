import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductInCart,
} from '../../shared/interfaces/product.interface';
import { Subject } from 'rxjs';
import { StorageService } from '../../shared/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //injectamos el storage service
  private storageService = inject(StorageService);

  //variablle para almacenar los productos del carrito
  // Inicializamos el carrito con los datos del almacenamiento local
  cartItems: ProductInCart[] = [];

  // Subject para los productos del carrito
  private _cartItems = new Subject<ProductInCart[]>();
  cartItems$ = this._cartItems.asObservable();

  // CartService metodo para sincronizar el carrito con el almacenamiento local
  syncCartWithStorage(): void {
    const savedCart = this.storageService.getCart();
    console.log('🔄 Sincronizando carrito con storage:', savedCart); // 👈 IMPORTANTE para debug
    this.cartItems = savedCart;
    this._cartItems.next(savedCart);
  }
  addToCart(product: Product): void {
    //verificar si el producto ya está en el carrito
    const productExists = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (productExists) {
      // Si existe, incrementar la cantidad
      productExists.quantity = (productExists.quantity || 1) + 1;
    } else {
      this.cartItems.push({
        product: product,
        quantity: 1, // Inicializar cantidad a 1
      });
    }
    // Guardar el carrito en el almacenamiento local
    this.storageService.saveCart(this.cartItems);
    // Emitir los cambios

    console.log('Antes de emitir carrito:', this.cartItems);
    this._cartItems.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.storageService.saveCart(this.cartItems);
    this._cartItems.next(this.cartItems);
  }

  constructor() {
    const savedCart = this.storageService.getCart();
    console.log("constructor",savedCart)
    this.cartItems = savedCart;
    this._cartItems.next(this.cartItems); // emitir también al iniciar
  }
}
