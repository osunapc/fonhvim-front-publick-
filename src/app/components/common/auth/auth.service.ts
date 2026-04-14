import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../../common/services/storage.service';
import { jwtDecode } from 'jwt-decode';
interface MyJwtPayload {
  role?: string;
  nombre?: string;
  ci?: string;
  municipio_parroquia?: string;
  email?: string;
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
        }),
      );
  }

  getUserRole(): Observable<string | null | undefined> {
    const session = this._storage.get('session');
    if (session !== null) {
      try {
        const sessionObj = JSON.parse(session);
        const decodedToken = jwtDecode<MyJwtPayload>(sessionObj.access_token);

        if (decodedToken && decodedToken.role) {
          return of(decodedToken.role);
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    }
    return of(null);
  }

  getUserData(): Observable<MyJwtPayload | null> {
    const session = this._storage.get('session');
    if (session !== null) {
      try {
        const sessionObj = JSON.parse(session);
        const decodedToken = jwtDecode<MyJwtPayload>(sessionObj.access_token);
        return of(decodedToken);
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    }
    return of(null);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.API_URL}/register`, data);
  }

  logout(): void {
    this._storage.remove('session');
  }

  isLoggedIn(): boolean {
    return this._storage.get('session') !== null;
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/forgot-password`, { email });
  }

  resetPassword(data: { token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${environment.API_URL}/reset-password`, data);
  }
}
