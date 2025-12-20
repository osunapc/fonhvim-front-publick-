import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../components/common/auth/auth.service';
import { map } from 'rxjs';

export const roleGuard = (roles: string[]): CanActivateFn => {
  return () => {
    return inject(AuthService)
      .getUserRole()
      .pipe(
        map((userRole: string | null | undefined) => {
          if (!userRole || !roles.includes(userRole)) {
            return false;
          }
          return true;
        })
      );
  };
};
