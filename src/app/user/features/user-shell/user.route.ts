import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../user-ecommerce/user-ecommerce.component')
  },

] as Routes;
