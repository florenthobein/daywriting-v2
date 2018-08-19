import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@app/shared/date.helper';

@Pipe({
  name: 'datekey2date'
})
export class Datekey2DatePipe implements PipeTransform {
  transform(datekey: string): Date {
    return DateHelper.getDateFromDatekey(datekey);
  }
}

@Pipe({
  name: 'date2datekey'
})
export class Date2DatekeyPipe implements PipeTransform {
  transform(date: Date): string {
    return DateHelper.getDatekey(date);
  }
}
