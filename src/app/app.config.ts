import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from './sharedServices/translation-loader';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export function initializeTranslation(translate: TranslateService, lang: string) {
  return async () => {
    try {
      await Promise.race([
        translate.use(lang).toPromise(),
        new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000)), // 5s timeout
      ]);
    } catch (error) {
      console.warn(`Translation initialization failed: ${error}`);
    }
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslation,
      deps: [TranslateService, 'LANG'],
      multi: true,
    },
    {provide: 'LANG', useValue: 'en'},
  ],
};
