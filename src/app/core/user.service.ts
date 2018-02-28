import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { RestService } from './rest.service';

import { AppSettings } from "../../app-settings.ts";

@Injectable()
export class UserService {

	private static USERS_ENDPOINT = '/users';

	constructor(private authHttp: AuthHttp, private restSvc: RestService) { }

	store(params: object): any {
		console.log('store', UserService.USERS_ENDPOINT+'/auth');
		this.authHttp.post(AppSettings.API_URL + UserService.USERS_ENDPOINT+'/auth', params)
			.toPromise();
	}

	getUser$(params?: object): Observable<any> {
		return this.authHttp.get(this.restSvc.formatUri(
			AppSettings.API_URL + UserService.USERS_ENDPOINT,
			params
		));
	}

}
