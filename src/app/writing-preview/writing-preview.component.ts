import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dw-writing-preview',
	template: `
		<div class="card card--whiteAlt layout--document u-px-8 u-py-4">
			<h3 class="u-pb-2">Florent hobein</h3>
			<p class="u-text-sm">La porte d'entrée ne lui fit pas résistance, pas plus que les étages...</p>
			<p class="u-text-center"><button href class="btn btn--alt">Lire le défi</button></p>
		</div>
	`,
	styles: []
})
export class WritingPreviewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
