import * as moment from 'moment';

export class DateHelper {
  public static DATEKEY = 'DD-MM-YY';
  public static MONTHKEY = 'MM-YY';

  public static getDatekey(date?: Date): string {
    return moment(date || new Date()).format(DateHelper.DATEKEY);
  }

  public static getDateFromDatekey(datekey: string): Date {
    return moment(datekey, DateHelper.DATEKEY).toDate();
  }

  public static checkDatekey(datekey: string): boolean {
    return moment(datekey, DateHelper.DATEKEY).isValid();
  }

  public static getMonthkey(date?: Date): string {
    return moment(date || new Date()).format(DateHelper.MONTHKEY);
  }

  public static checkMonthkey(monthkey: string): boolean {
    return moment(monthkey, DateHelper.MONTHKEY).isValid();
  }

  public static compare(datekey1: string, datekey2: string): number {
    const a = DateHelper.getDateFromDatekey(datekey1),
      b = DateHelper.getDateFromDatekey(datekey2);
    return a > b ? 1 : a < b ? -1 : 0;
  }
}
