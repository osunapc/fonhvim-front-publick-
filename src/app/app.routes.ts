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
    path: 'solicitudes',
    canActivate: [privateGuard],
    loadComponent: () =>
      import('./pages/solicitudes/solicitudes').then((m) => m.Solicitudes),
  },
  {
    path: 'consultar',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/consulta-tramite/consulta-tramite').then(
        (m) => m.ConsultaTramite,
      ),
  },
  {
    path: 'quienes-somos',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/quienes-somos/quienes-somos').then((m) => m.QuienesSomos),
  },
  {
    path: 'organigrama',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/organigrama/organigrama').then((m) => m.Organigrama),
  },
  {
    path: 'servicios',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/servicios/servicios').then((m) => m.Servicios),
  },
  {
    path: 'galeria',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pages/galeria/galeria').then((m) => m.Galeria),
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./pages/reset-password/reset-password').then(
        (m) => m.ResetPasswordComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
