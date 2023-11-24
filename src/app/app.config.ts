import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AuthService } from '@services/auth.service';
import { AppService } from '@services/app.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UiService } from '@services/ui.service';
function initializerFactory(appService: AppService): () => Promise<any> {
  return () => appService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFactory,
      deps: [AppService],
      multi: true,
    },
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: '',
          appId: '',
          databaseURL: '',
          storageBucket: '',
          apiKey: '',
          authDomain: '',
          messagingSenderId: '',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    provideAnimations(),
    AuthService,
    UiService,
  ],
};
