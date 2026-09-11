import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Restaurant } from './restaurant/restaurant';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'restaurant',
    component: Restaurant
  }
];