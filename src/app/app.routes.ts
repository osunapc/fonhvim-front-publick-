import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './common/guards/auth.guard';
import { roleGuard } from './common/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },

  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
