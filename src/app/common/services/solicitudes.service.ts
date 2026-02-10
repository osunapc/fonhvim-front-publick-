import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicSolicitudesService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  enviarSolicitud(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitudes`, data);
  }

  consultarEstatus(ci: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/ci/${ci}`);
  }
}
