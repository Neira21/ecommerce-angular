import { signalSlice } from 'ngxtension/signal-slice';
import { Product, ProductFilters } from './../../shared/interfaces/product.interface';
import { inject, Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { catchError, map, Observable, of } from 'rxjs';

interface State {
  products: Product[];
  filteredProducts: Product[],
  filters: ProductFilters,
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductStateService {

  private productService = inject(ProductsService)

  // Estado inicial
  // Aquí se define el estado inicial de los productos, filtros y estado de carga
  private initialState: State = {
    products: [],
    filteredProducts: [],
    filters: {},
    status: 'loading',
  };


  private filterProducts(products: Product[], filters: ProductFilters): Product[] {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.priceRange && (product.price < filters.priceRange.min || product.price > filters.priceRange.max)) return false;
      if (filters.rating && product.rating.rate < filters.rating) return false;
      if (filters.searchTerm && !product.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      return true;
    });
  }

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.productService.getProducts().pipe(
        map((products) => ({
          products,
          filteredProducts: products, // Inicialmente todos los productos
          status: 'success' as const
        })),
        catchError(() =>
          of({
            products: [],
            filteredProducts: [],
            status: 'error' as const
          })
        )
      ),
    ],
    actionSources: {
      applyFilters: (state, action$: Observable<ProductFilters>) =>
        action$.pipe(
          map((filters) => {
            const filteredProducts = this.filterProducts(state().products, filters);
            return {
              filters,
              filteredProducts
            };
          })
        ),

      clearFilters: (state, action$) =>
        action$.pipe(
          map(() => ({
            filters: {},
            filteredProducts: state().products
          }))
        )
    }
  });

  // Métodos públicos
  applyFilters(filters: ProductFilters) {
    this.state.applyFilters(filters);
  }

  clearFilters() {
    this.state.clearFilters();
  }
}
