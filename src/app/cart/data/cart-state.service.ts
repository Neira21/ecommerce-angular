import { inject, Injectable, Signal } from '@angular/core';
import { ProductInCart } from '../../shared/interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from '../../shared/storage/storage.service';
import { map, Observable } from 'rxjs';

interface State {
  products: ProductInCart[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private storageService = inject(StorageService);

  private initialState: State = {
    products: [],
    loaded: false,
  };

  loadProducts$ = this.storageService.loadProducts().pipe(
    map((products) => ({
      products,
      loaded: true,
    }))
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      add: (state, action$: Observable<ProductInCart>) =>
        action$.pipe(map((product) => this.add(state, product))),
    },
    effects: (state) => ({
      load: () => {
        console.log('🛒 Cart loaded from storage:', state().products);
        if(state().loaded)  this.storageService.saveCart(state().products);
      },
    }),
  });

  private add(state: Signal<State>, productInCart: ProductInCart) {
  const existing = state().products.find(p => p.product.id === productInCart.product.id);

  if (!existing) {
    return {
      products: [...state().products, productInCart],
    };
  }

  // Creamos una nueva lista con la cantidad actualizada sin mutar directamente
  const updatedProducts = state().products.map(p =>
    p.product.id === productInCart.product.id
      ? { ...p, quantity: p.quantity + productInCart.quantity }
      : p
  );

  return {
    products: updatedProducts,
  };
}
}
