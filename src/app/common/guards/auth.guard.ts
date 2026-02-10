import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

export const privateGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const session = authState.getSession();

  console.log('🛡️ PrivateGuard: Verificando sesión...');
  if (session) {
    console.log('✅ PrivateGuard: Sesión activa, permitiendo acceso');
    return true;
  }

  console.warn('⚠️ PrivateGuard: Sin sesión, redirigiendo a /login');
  router.navigateByUrl('/login');
  return false;
};

export const publicGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const session = authState.getSession();
  console.log('🛡️ PublicGuard: Verificando sesión en ruta:', state.url);

  // Solo redirigir fuera si intentan ir al LOGIN ya con sesión
  if (session && state.url === '/login') {
    console.log(
      'ℹ️ PublicGuard: Sesión detectada en /login, redirigiendo a /solicitudes',
    );
    router.navigateByUrl('/solicitudes');
    return false;
  }

  console.log('✅ PublicGuard: Permitir acceso a la ruta');
  return true;
};
