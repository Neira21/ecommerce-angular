import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          description:
            product.description.charAt(0).toUpperCase() +
            product.description.slice(1).toLowerCase(),
          inCart: false,
        }))
      )
    );
  }

  getProductById(id:number):Observable<Product> {
    return this.http.get<Product>('https://fakestoreapi.com/products' + '/' + id)
  }


}
