import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login-routing'),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./modules/contacts/contacts-routing'),
  },
];
