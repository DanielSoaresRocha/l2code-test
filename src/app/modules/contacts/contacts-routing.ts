import { Routes } from '@angular/router';
import { RegisterComponent } from './components';

export default [
  {
    path: '',
    redirectTo: '/contacts/register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'update',
    component: RegisterComponent,
  },
] as Routes;
