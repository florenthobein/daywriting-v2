import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { DailychallengeService } from '@app/core/dailychallenge.service';
import { UserService } from '@app/core/user.service';
import { MissionService } from '@app/core/mission.service';
import { LangService } from '@app/core/lang.service';
import { IChallenge } from '@app/models/challenge';
import { DateHelper } from '@app/shared/date.helper';
import * as fromRoot from '@app/reducers';
import { calendarAnimation } from './calendar.animation';
import { UnselectChallenge } from '@app/actions/challenges';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, takeUntil, tap } from 'rxjs/operators';
import { closeWhen } from '@app/rxjs-custom-operators';

@Component({
  selector: 'dw-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: calendarAnimation
})
export class CalendarComponent implements OnInit, OnDestroy {

  public monthkey: string;
  public monthkey$: BehaviorSubject<string> = new BehaviorSubject(DateHelper.getMonthkey());
  public currentChallenge$: Observable<IChallenge>;
  public challenges$: Observable<IChallenge[]>;

  private onDestroy$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private challengeSvc: DailychallengeService,
              private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
    this.monthkey$.pipe(
      closeWhen(this.onDestroy$),
      tap(monthkey => challengeSvc.loadDailychallenges({monthkey})),
    ).subscribe(monthkey => this.monthkey = monthkey);
    this.currentChallenge$ = store.pipe(select(fromRoot.selectCurrentChallenge));
    this.challenges$ = this.challengeSvc.get$(x => new RegExp(`-${this.monthkey}\$`).test(x.datekey));
  }

  public ngOnInit() {

    // TODO verify eventual leak when changing route
    combineLatest(this.route.data, this.route.paramMap).pipe(
      closeWhen(this.onDestroy$),
    ).subscribe(([data, params]) => {
      const datekey = params.get('datekey') || DateHelper.getDatekey();
      this.challengeSvc.loadDailychallenge({datekey}, !!data.showWriter);
      if (!data.showWriter)
        this.store.dispatch(new UnselectChallenge());
    });

  }

  public ngOnDestroy() {
    this.onDestroy$.next(null);
  }

}
