import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Lazy routes stay off the initial bundle, then preload in the background
    // once the app is idle so in-app navigation between pages feels instant.
    provideRouter(routes, withPreloading(PreloadAllModules))
  ]
};
