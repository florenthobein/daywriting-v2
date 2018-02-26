import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs/Observable';
import {
	distinctUntilChanged, switchMap
 } from 'rxjs/operators';

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
			<p><a class="btn" href>English version</a></p>
		</footer>`,
	styles: []
})
export class AppComponent {

	focusWriting: string;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.paramMap.subscribe(
			params => this.focusWriting = params.get('id')
		);
	}
}
