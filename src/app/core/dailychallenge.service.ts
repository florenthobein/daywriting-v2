import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { RestService } from './rest.service';
import * as fromRoot from '@app/reducers';
import { AddChallenge, AddChallenges, SelectChallenge } from '@app/actions/challenges';
import { IChallenge } from '@app/models/challenge';

@Injectable()
export class DailychallengeService {

  private DAILYCHALLENGES_ENDPOINT = '/dailychallenges';
  private DAILYCHALLENGE_ENDPOINT = '/dailychallenges/:datekey';

  private dispatch = (action) => this.store.dispatch(action);
  private dispatchSeveral = (actions) => actions.map(this.dispatch);

  constructor(private restSvc: RestService,
              private store: Store<fromRoot.State>) {
  }

  public get$(filterFn: (challenge: IChallenge) => boolean): Observable<IChallenge[]> {
    return this.store.pipe(
      select(fromRoot.selectAllChallenges),
      filter(x => !!x.length),
      map(x => x.filter(filterFn)));
  }

  public loadDailychallenge(params: {datekey: string}, selectChallenge?: boolean) {
    this.restSvc.get<IChallenge>(this.DAILYCHALLENGE_ENDPOINT, params).pipe(
      map(payload => (payload.status !== 'error' ? payload.result : false)),
      filter(payload => !!payload),
      map(payload => _.compact([
        new AddChallenge({ challenge: (payload as IChallenge) }),
        selectChallenge ? new SelectChallenge({ challenge: (payload as IChallenge) }) : ''
      ])),
    ).subscribe(this.dispatchSeveral);
  }

  public loadDailychallenges(params?: any) {
    this.restSvc.get<IChallenge[]>(this.DAILYCHALLENGES_ENDPOINT, params, { expiration: 60000 }).pipe(
      map(payload => (payload.status !== 'error' ? payload.result : false)),
      filter(payload => payload && !!(payload as IChallenge[]).length),
      map(payload => (new AddChallenges({ challenges: (payload as IChallenge[]) }))),
    ).subscribe(this.dispatch);
  }
}
