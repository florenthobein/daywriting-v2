import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


import { AuthService } from './auth.service';
import { RestService } from './rest.service';
import { LangService } from './lang.service';
import { StoreService } from './store.service';

import { UserService } from './user.service';
import { DailyChallengeService } from './daily-challenge.service';
import { MissionService } from './mission.service';

import { throwIfAlreadyLoaded } from './module-import.guard';

@NgModule({
	imports: [
		CommonModule,
		HttpModule
	],
	exports: [ /* components */ ],
	declarations: [ /* components */ ],
	providers: [
		AuthService,
		RestService,
		LangService,
		// HTTP access service
		UserService,
		DailyChallengeService,
		MissionService,
		{
			provide: AuthHttp,
			useFactory: authHttpFactory, // defines how to provide AuthHttp
			deps: [ Http, RequestOptions ]
		},
		StoreService
	]
})

export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}

export function authHttpFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig(), http, options);
}
