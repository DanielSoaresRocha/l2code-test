import { Routes } from '@angular/router';
import { RegisterComponent, SearchComponent } from './components';

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
    path: 'search',
    component: SearchComponent,
  },
] as Routes;
