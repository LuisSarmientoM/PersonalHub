import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AuthService } from '@services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'housing-ap',
          appId: '1:170611004158:web:dafdf1c89da560ffaecbaf',
          databaseURL: 'https://housing-ap-default-rtdb.firebaseio.com',
          storageBucket: 'housing-ap.appspot.com',
          apiKey: 'AIzaSyCvVrJzMJ8ZIogCCs5DFu6saQTCDlcotog',
          authDomain: 'housing-ap.firebaseapp.com',
          messagingSenderId: '170611004158',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    AuthService,
  ],
};
