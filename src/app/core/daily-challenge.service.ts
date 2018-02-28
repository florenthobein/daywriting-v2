import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import { LangService } from './lang.service';

import { Challenge } from '../models/challenge';
import { Mission } from '../models/mission';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DailyChallengeService {

	index: { [datekey:string]: Challenge } = {};

	private static DAILYCHALLENGES_ENDPOINT = '/dailychallenges';

	constructor(private restSvc: RestService, private langSvc: LangService) { }

	/**
	 * Put a new challenge in the index or update an existing one
	 * @param  {object}    params [description]
	 * @return {Challenge}        [description]
	 */
	store(params: any): Challenge {
		let datekey = params ? params.datekey : null;
		if (!datekey) return new Challenge();
		if (this.index[datekey]) {
			this.index[datekey].mission = params.mission || null;
			return this.index[datekey];
		} else {
			this.index[datekey] = new Challenge(params);
		}
	}

	/**
	 * Retrieve all the challenges of the current month
	 * @param  {object}                  params [description]
	 * @return {Observable<Challenge[]>}        [description]
	 */
	getDailyChallenges$(params?: object): Observable<Challenge[]> {
		return this.restSvc.get<Challenge[]>(
			DailyChallengeService.DAILYCHALLENGES_ENDPOINT,
			params
		).pipe(
			tap(res => {
				for (let i in res) this.store(res[i]);
			})
		);
	}

	/**
	 * Create a daily challenge
	 * @param  {string}                  datekey [description]
	 * @return {Observable<Challenge>}           [description]
	 */
	createDailyChallenges$(datekey: string): Observable<Challenge> {
		return this.restSvc.post<Challenge>(
			DailyChallengeService.DAILYCHALLENGES_ENDPOINT,
			null,
			{ 'datekey': datekey }
		).pipe(
			tap(res => this.store(res))
		);
	}

}
