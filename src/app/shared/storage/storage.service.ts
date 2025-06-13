import { Injectable } from "@angular/core";
import { ProductInCart } from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  saveCart(cartItems: ProductInCart[]): void {
    console.log("Saving cart items to local storage:", cartItems);
    this.storage.setItem("cart", JSON.stringify(cartItems));
  }

  getCart(): ProductInCart[] {
    const cart = this.storage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }

  clearCart(): void {
    this.storage.removeItem("cart");
  }

  updateCart(cartItems: ProductInCart[]) {
    this.saveCart(cartItems);
  }



}
