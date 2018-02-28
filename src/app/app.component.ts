import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs/Observable';
import {
	distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { LangService } from './core/lang.service';

@Component({
	selector: 'dw-root',
	template: `
		<header class="u-container u-text-center u-mx-auto">
			<dw-nav-bar class="layout--grid u-px-64"></dw-nav-bar>
		</header>
		<main>
			<router-outlet></router-outlet>
		</main>
		<footer class="theme--black layout--document u-p-16 u-text-center">
			<p>Fait avec <i class="icon icon--heart u-text-tertiary"></i> par <a href="//florent.hobein.fr" target="_blank" rel="noopener">Florent Hobein</a></p>
			<p>
				<a class="btn" href *ngIf="getLang() !== 'fr'" (click)="changeLang('fr')">Version française</a>
				<a class="btn" href *ngIf="getLang() !== 'en'" (click)="changeLang('en')">English version</a>
			</p>
		</footer>`,
	styles: []
})
export class AppComponent {

	focusWriting: string;

	constructor(private langSvc: LangService, private location: Location, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.paramMap.subscribe(
			params => this.focusWriting = params.get('id')
		);
	}

	getLang(): string {
		return this.langSvc.getLang();
	}

	changeLang(locale: string) {
		this.langSvc.changeLang(locale);
		// this.location.reload();
		window.location.reload();
	}
}
