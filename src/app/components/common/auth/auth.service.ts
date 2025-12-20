import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../../common/services/storage.service';
import { jwtDecode } from 'jwt-decode';
interface MyJwtPayload {
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storage = inject(StorageService);

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._storage.set('session', JSON.stringify(response));
        })
      );
  }

  getUserRole(): Observable<string | null | undefined> {
    const session = this._storage.get('session');
    if (session !== null) {
      try {
        const sessionObj = JSON.parse(session);
        // CORRECCIÓN: Declara explícitamente el tipo de token esperado.
        const decodedToken = jwtDecode<MyJwtPayload>(sessionObj.access_token);

        // Valida que el token y el rol existan antes de devolverlos.
        if (decodedToken && decodedToken.role) {
          return of(decodedToken.role);
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        // No se encontró un token válido o hubo un error, se devuelve null.
      }
    }
    return of(null);
  }

  register(
    username: string,
    email: string,
    password: string,
    ciudad: string
  ): Observable<any> {
    return this.http.post(`${environment.API_URL}/register`, {
      username,
      email,
      password,
      ciudad,
    });
  }
}
