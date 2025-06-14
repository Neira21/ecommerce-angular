import {
  inject,
  Injectable,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';
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
      remove: (state, action$: Observable<ProductInCart>) =>
        action$.pipe(map((product) => this.remove(state, product))),
      increment: (state, action$: Observable<ProductInCart>) =>
        action$.pipe(map((product) => this.increment(state, product))),
      decrement: (state, action$: Observable<ProductInCart>) =>
        action$.pipe(map((product) => this.decrement(state, product))),
    },
  });

  constructor() {
    // 👇 Nuevo efecto independiente fuera de signalSlice
    effect(() => {
      const currentState = this.state();
      if (currentState.loaded) {
        this.storageService.saveCart(currentState.products);
      }
    });
  }

  private add(state: Signal<State>, productInCart: ProductInCart) {
    const existing = state().products.find(
      (p) => p.product.id === productInCart.product.id
    );
    if (!existing) {
      return {
        products: [...state().products, productInCart],
      };
    }
    const updatedProducts = state().products.map((p) =>
      p.product.id === productInCart.product.id
        ? { ...p, quantity: p.quantity + productInCart.quantity }
        : p
    );
    return {
      products: updatedProducts,
    };
  }

  private remove(state: Signal<State>, productInCart: ProductInCart) {
    return {
      products: state().products.filter(
        (p) => p.product.id !== productInCart.product.id
      ),
    };
  }

  private increment(state: Signal<State>, productInCart: ProductInCart) {
  const updatedProducts = state().products.map(p =>
    p.product.id === productInCart.product.id
      ? { ...p, quantity: p.quantity + 1 }
      : p
  );
  return { products: updatedProducts };
}

private decrement(state: Signal<State>, productInCart: ProductInCart) {
  const updatedProducts = state().products
    .map(p =>
      p.product.id === productInCart.product.id
        ? { ...p, quantity: p.quantity - 1 }
        : p
    )
    .filter(p => p.quantity > 0); // Eliminar si la cantidad llega a 0

  return { products: updatedProducts };
}
}
