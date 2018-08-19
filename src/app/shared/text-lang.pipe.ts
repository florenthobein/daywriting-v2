import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '@app/core/lang.service';

@Pipe({
  name: 'textLang'
})
export class TextLangPipe implements PipeTransform {

  constructor(private langSvc: LangService) { }

  transform(texts: {[locale: string]: string}): string {
    return texts && texts[this.langSvc.getLang()];
  }

}
