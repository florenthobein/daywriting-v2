import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@app/shared/date.helper';
import { IChallenge } from '@app/models/challenge';
import * as _ from 'lodash';

@Pipe({
  name: 'calendarize'
})
export class CalendarizePipe implements PipeTransform {

  transform(challenges: IChallenge[], monthkey?: string): IChallenge[] | any {
    const calendar = [];
    const date = moment(monthkey || DateHelper.getMonthkey(), DateHelper.MONTHKEY);

    // Create an index to access the challenges
    const challengeIdx: { [datekey: string]: IChallenge } = {};
    if (challenges)
      challenges.map(x => challengeIdx[x.datekey] = x);

    // Add 'empty days' at the beginning
    const firstDayOfTheMonth: number = date.startOf('month').weekday();  // locale aware
    _.range(firstDayOfTheMonth).map(() => calendar.push({}));

    // Fill with the days
    const nbDays = date.endOf('month').date();
    _.range(1, nbDays + 1).map((d: number) => {
      const datekey = DateHelper.getDatekey(date.date(d).toDate());
      calendar.push(challengeIdx[datekey] || { datekey });
    });

    return calendar;
  }

}
