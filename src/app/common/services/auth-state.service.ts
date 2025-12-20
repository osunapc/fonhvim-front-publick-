// En tu AuthStateService
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Session } from '../types/types-common';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _storageService = inject(StorageService);

  signOut() {
    this._storageService.remove('session');
  }

  getSession(): Session | null {
    // 1. Obtiene la sesión como una cadena
    const mayBeSessionStr = this._storageService.get('session');

    if (mayBeSessionStr === null) {
      return null;
    }

    try {
      // 2. Convierte la cadena JSON en un objeto de JavaScript
      const mayBeSession = JSON.parse(mayBeSessionStr);

      // 3. Valida el objeto
      if (this._isValidSession(mayBeSession)) {
        return mayBeSession as Session;
      } else {
        // Si no es válido, se borra la sesión
        this.signOut();
        return null;
      }
    } catch (e) {
      // 4. Si el análisis falla (por ejemplo, por datos corruptos), también se borra la sesión
      console.error('Error al analizar los datos de la sesión:', e);
      this.signOut();
      return null;
    }
  }

  private _isValidSession(myBeSession: unknown) {
    return (
      typeof myBeSession === 'object' &&
      myBeSession !== null &&
      'access_token' in myBeSession
    );
  }
}