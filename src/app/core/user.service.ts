import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { RestService } from './rest.service';

@Injectable()
export class UserService {

	private static USERS_ENDPOINT =
		'https://wt-f23dcdfbf8ed5173b271a502a16e2e6e-0.run.webtask.io/users';

	constructor(private authHttp: AuthHttp, private restSvc: RestService) { }

	store(params: object): any {
		console.log('store', UserService.USERS_ENDPOINT+'/auth');
		this.authHttp.post(UserService.USERS_ENDPOINT+'/auth', params)
			.toPromise();
	}

	getUser$(params?: object): Observable<any> {
		return this.authHttp.get(this.restSvc.formatUri(
			UserService.USERS_ENDPOINT,
			params
		));
	}

}
