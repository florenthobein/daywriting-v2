import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';

import { DailyChallengeService } from '../core/daily-challenge.service'
import { UserService } from '../core/user.service'
import { MissionService } from '../core/mission.service'

import { LangService } from '../core/lang.service'

import { Challenge } from '../models/challenge'
import { Mission } from '../models/mission'

import { Observable, ObservableInput } from 'rxjs/Observable';
import {
	distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { trigger, query, state, style, transition, animate, keyframes } from '@angular/animations';

import { Date2DatekeyPipe } from '../shared/datekey.pipe'

@Component({
	selector: 'dw-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css'],
	animations: [
		trigger('calendarAnim', [
			state('false, void', style({ opacity: .2, transform: 'scale(.6, .6)' })),
			state('true', style({ opacity: 1, transform: 'scale(1, 1)' })),
			transition(':enter', animate('200ms')),
			transition(':leave', animate('200ms')),
		]),
		trigger('writerAnim', [
			state('false, void', style({ opacity: 0, transform: 'scale(0, 0) translateY(-50px)' })),
			state('true', style({ opacity: 1, transform: 'scale(1, 1) translateY(0)' })),
			transition(':enter', animate("200ms", keyframes([
				style({ offset: 0, opacity: 0, transform: 'scale(0, 0) translateY(-50px)' }),
				style({ offset: .1, opacity: 0, transform: 'scale(1, 1) translateY(-50px)' }),
				style({ offset: 1, opacity: 1, transform: 'scale(1, 1) translateY(0)' }),
			]))),
			transition(':leave', animate("200ms", keyframes([
				style({ offset: 0, opacity: 1, transform: 'scale(1, 1) translateY(0)' }),
				style({ offset: .9, opacity: 0, transform: 'scale(1, 1) translateY(-50px)' }),
				style({ offset: 1, opacity: 0, transform: 'scale(0, 0) translateY(-50px)' }),
			]))),
		]),
	]
})
export class CalendarComponent implements OnInit {

	is_loading: boolean;
	challenge: Challenge;

	previousMonth:any[] = [];
	currentMonth:any[] = [];
	nextMonth:any[] = [];

	constructor(
		private challengeSvc: DailyChallengeService,
		private userSvc: UserService,
		private missionSvc: MissionService,
		private date2datekeyPipe: Date2DatekeyPipe,
		private langSvc: LangService,
		private route: ActivatedRoute,
		private router: Router) { }

	private getCalendar(now: Date): any[] {

		let month = [];

		let current_day;
		let first_day_of_the_month = new Date(now.getFullYear(), now.getMonth());
		let last_day_of_the_month = new Date(now.getFullYear(), now.getMonth()+1);
		last_day_of_the_month = new Date(last_day_of_the_month.getTime()-1);

		// Fill first empty days
		current_day = first_day_of_the_month.getDay();
		if (current_day === 0) current_day = 7; // particular case for sunday
		while (current_day-- > 1) {
			month.push({});
		}

		// Fill with the rest of the month
		current_day = first_day_of_the_month.getDate()-1;
		while (current_day++ < last_day_of_the_month.getDate()) {
			let d = current_day < 10 ? '0'+current_day : ''+current_day;
			let m = now.getUTCMonth() < 9 ? '0'+(now.getUTCMonth()+1) : ''+(now.getUTCMonth()+1);
			let y = ''+(now.getUTCFullYear()-2000);
			let datekey = `${d}-${m}-${y}`;
			this.challengeSvc.store({ 'datekey': datekey });
			month.push(this.challengeSvc.index[datekey]);
		}
		return month
	}

	ngOnInit() {

		// Prepare the months
		let now = new Date();
		this.currentMonth = this.getCalendar(now);
		this.previousMonth = this.getCalendar(new Date(now.getFullYear(), now.getMonth()-1));

		// Load the challenges
		this.is_loading = true;
		this.challengeSvc.getDailyChallenges$()
			.toPromise()
			.then(() => this.is_loading = false);

		// If today
		// TODO refactor
		if (this.router.url === '/') {
			let datekey = this.date2datekeyPipe.transform(new Date());
			this.challenge = this.challengeSvc.index[datekey];
			// console.log()
		}

		// If focus on challenge
		this.route.paramMap.subscribe(
			params => {
				if (params.get('datekey'))
					this.challenge = this.challengeSvc.index[params.get('datekey')]
			}
		);

	}

	createChallenge(challenge: Challenge) {
		this.challengeSvc.index[challenge.datekey]
		if (this.is_loading || !this.challengeSvc.index[challenge.datekey])
			return true;
		if (this.challengeSvc.index[challenge.datekey].mission)
			return true;
		this.challengeSvc.createDailyChallenges$(challenge.datekey)
			.toPromise();
			// .then((new_challenge) => {
			// 	console.log(new_challenge);
			// });
	}

}
