import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

export const privateGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const session = authState.getSession();

  if (session) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};

export const publicGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const session = authState.getSession();
console.log('session', session)
  if (session) {
    router.navigateByUrl('/solicitudes');
  }

  return true;
};
