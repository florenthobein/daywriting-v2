import { APP_BASE_HREF } from "@angular/common";
import { CompilerOptions, LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT } from "@angular/core";

import { AppSettings } from "./app-settings.ts";

/**
 * Returns the current lang for the application
 * using the existing base path
 * or the browser lang if there is no base path
 * @returns {string}
 */
export function getLang(): string | null {

	let lang: string;

	// First, check the path
	if (typeof window !== 'undefined') {
		const basePath = window.location.pathname.replace('/', '').split('/');
		lang = basePath.length && basePath[0].match(AppSettings.ALLOWED_LANGS) ? basePath[0] : '';
	}

	// Then, check the localStorage
	if (!lang && localStorage && localStorage.getItem('lang')) {
		lang = localStorage.getItem('lang');
	}

	// Then, check the browser
	if (!lang && !(typeof window === 'undefined' || typeof window.navigator === 'undefined')) {
		lang = window.navigator['languages'] ? window.navigator['languages'][0] : null;
		lang = lang || window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'] || '';
		if (lang.indexOf('-') !== -1) {
			lang = lang.split('-')[0];
		}
		if (lang.indexOf('_') !== -1) {
			lang = lang.split('_')[0];
		}
	}

	// Finally, fallback
	lang = lang.match(AppSettings.ALLOWED_LANGS) ? lang : AppSettings.FALLBACK_LANG;

	// Store in localStorage
	sessionStorage.setItem('lang', lang);

	return lang;
}

/**
 * Lazy-load the translations in JIT
 * or does nothing in AOT
 * @param isAot a parameter to know if the app is using AOT or not
 * @returns {any}
 */
export function getTranslationProviders(isAot: boolean): CompilerOptions[] {

	if (isAot) {
		return [];
	}

	const locale = getLang();
	const PROVIDERS = [
		{ provide: LOCALE_ID, useValue: locale }
	];

	// if (locale) {
	// 	document.querySelector('base').href = `/${locale}`;
	// 	PROVIDERS.push({provide: APP_BASE_HREF, useValue: `/${locale}`});
	// }

	// No locale or english
	if (!locale || locale === AppSettings.FALLBACK_LANG) {
		return PROVIDERS;
	}

	declare const require;
	let translations = require(`raw-loader!./locale/messages.${locale}.xlf`);
	return [
			{ provide: TRANSLATIONS, useValue: translations },
			{ provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
			...PROVIDERS
		];
}
