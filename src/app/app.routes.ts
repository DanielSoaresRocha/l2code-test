import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout';
import { AuthGuard } from './shared/guards/auth.guard';

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
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/contacts/contacts-routing'),
      },
    ],
  },
];
