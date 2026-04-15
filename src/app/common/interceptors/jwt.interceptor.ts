import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const storageService = inject(StorageService);
  
  const session = storageService.get('session');
  
  if (session) {
    try {
      const sessionObj = JSON.parse(session);
      const token = sessionObj.access_token;
      
      if (token) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedRequest);
      }
    } catch (e) {
      console.error('Error parsing session in interceptor:', e);
    }
  }
  
  return next(req);
};