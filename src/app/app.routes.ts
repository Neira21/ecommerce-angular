import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/features/product-shell/product.routes'),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/features/cart-shell/cart.routes'),
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/features/user-shell/user.route'),
  },
  {
    path: '**',
    redirectTo: 'user',
  }
];
