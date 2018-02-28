import { Injectable } from '@angular/core';

import { AppSettings } from "../../app-settings";

@Injectable()
export class LangService {

	constructor() { }

	public changeLang(locale: string): string {
		locale.match(AppSettings.ALLOWED_LANGS) ? locale : AppSettings.FALLBACK_LANG;
		localStorage.setItem('lang', locale);
		return locale;
	}

	public getLang(): string {
		let locale: string = localStorage.getItem('lang') || AppSettings.FALLBACK_LANG;
		return locale;
	}
}
