import * as moment from 'moment';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app-settings';

@Injectable()
export class LangService {

  constructor() {
    moment.locale(this.getLang());
  }

  public changeLang(locale: string): string {
    locale = locale.match(AppSettings.ALLOWED_LANGS) ? locale : AppSettings.FALLBACK_LANG;
    localStorage.setItem('lang', locale);
    return locale;
  }

  public getLang(): string {
    return localStorage.getItem('lang') || AppSettings.FALLBACK_LANG;
  }
}
