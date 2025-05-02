import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "jack-of-all-games", appId: "1:831810578588:web:6e828d6d62173cdb976559", storageBucket: "jack-of-all-games.firebasestorage.app", apiKey: "AIzaSyDcC73-4BIS4t4jFowahH3zamyhNiW9yZA", authDomain: "jack-of-all-games.firebaseapp.com", messagingSenderId: "831810578588", measurementId: "G-KJ7YMDLYT6" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
