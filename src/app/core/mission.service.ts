import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { Mission } from '../models/mission';

@Injectable()
export class MissionService {

	private static MISSIONS_ENDPOINT = '/missions';

	constructor(private authHttp: AuthHttp) { }

	loadMissions$(): Observable<any> {
		return this.authHttp.get(MissionService.MISSIONS_ENDPOINT);
	}

	getMission$(id: string): Observable<any> {
		return this.authHttp.get(MissionService.MISSIONS_ENDPOINT +
			'/' + id);
	}

	addMission$(mission: Mission) : Observable<any> {
		return this.authHttp.post(MissionService.MISSIONS_ENDPOINT, mission);
	}

	deleteMission$(mission: Mission): Observable<any> {
		return this.authHttp.delete(MissionService.MISSIONS_ENDPOINT +
			'/' + mission.id);
	}

}
