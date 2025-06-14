import { signalSlice } from 'ngxtension/signal-slice';
import { Product } from './../../shared/interfaces/product.interface';
import { inject, Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { catchError, map, of } from 'rxjs';

interface State {
  products: Product[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductStateService {

  private productService = inject(ProductsService)

  private initialState: State = {
    products: [],
    status: 'loading',
  };

  loadProducts$ = this.productService.getProducts().pipe(
    map((products) => ({
      products,
      status: 'success' as const })),
    catchError(() =>
      of({
        products: [],
        status: 'error' as const,
      })
    )
  )

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.loadProducts$,
    ]
  })
}
