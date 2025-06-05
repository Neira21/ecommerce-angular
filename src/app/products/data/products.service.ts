import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient)

  constructor() { }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

}
