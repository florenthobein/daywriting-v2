import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { getTranslationProviders } from './i18n-providers';

if (environment.production) {
	enableProdMode();
}

// Change getTranslationProviders paramter if AOT is not on production
let providers = getTranslationProviders(environment.production);
platformBrowserDynamic().bootstrapModule(AppModule, { providers });
