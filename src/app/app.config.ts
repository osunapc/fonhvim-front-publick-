import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { icons, LucideAngularModule } from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { jwtInterceptor } from './common/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick(icons)),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};
