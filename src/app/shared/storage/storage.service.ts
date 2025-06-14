import { Injectable } from "@angular/core";
import { ProductInCart } from "../interfaces/product.interface";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loadProducts(): Observable<ProductInCart[]> {
    const rawProducts = localStorage.getItem("cart");
    return of(rawProducts ? JSON.parse(rawProducts) : []);
  }

  saveCart(cart: ProductInCart[]): void {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
