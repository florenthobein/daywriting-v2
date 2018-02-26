import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DailyChallengeService } from './core/daily-challenge.service';

@Injectable()
export class ChallengeGuard implements CanActivate {

	constructor(private challengeSvc: DailyChallengeService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.challengeSvc.index[next.params.datekey] && this.challengeSvc.index[next.params.datekey].mission)
			return true;
		return false;
	}
}
