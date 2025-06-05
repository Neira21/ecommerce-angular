import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/features/product-shell/product.routes'),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/features/cart-shell/cart.routes'),
  },
  {
    path: '**',
    redirectTo: 'products',
  }
];
