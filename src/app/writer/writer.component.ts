import { Component, OnInit, Input } from '@angular/core';

import { DailyChallengeService } from '../core/daily-challenge.service'
import { UserService } from '../core/user.service'

import { Challenge } from '../models/challenge'
import { Mission } from '../models/mission'
// import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
	selector: 'dw-writer',
	templateUrl: './writer.component.html',
	styleUrls: ['./writer.component.css'],
	// animations: [
	// 	trigger('trans', [
	// 		// state('void', style({transform: 'translateY(-100%)'})),
	// 		// transition('* => *', animate(1000))
	// 		state('nogo', style({ transform: 'scale(0, 0)' })),
	// 		state('go', style({ transform: 'scale(1, 1)' })),
	// 		transition('* <=> *', animate('1s')),
	// 	]),
	// ]
})
export class WriterComponent implements OnInit {

	title:string = '';
	modules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike'],				// toggled buttons
		// ['blockquote', 'code-block'],

		// [{ 'header': 1 }, { 'header': 2 }],							 // custom button values
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
		// [{ 'script': 'sub'}, { 'script': 'super' }],			// superscript/subscript
		[{ 'indent': '-1'}, { 'indent': '+1' }],					// outdent/indent
		// [{ 'direction': 'rtl' }],												 // text direction

		[{ 'size': ['small', false, 'large', 'huge'] }],	// custom dropdown
		// [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

		// [{ 'color': [] }, { 'background': [] }],					// dropdown with defaults from theme
		// [{ 'font': [] }],
		[{ 'align': [] }],

		['clean'],																				 // remove formatting button

		// ['link', 'image', 'video']												 // link and image, video
	]
};

	@Input() challenge: Challenge;

	constructor(private challengeSvc:DailyChallengeService, private userSvc:UserService) { }

	ngOnInit() {
		// setTimeout(() => this.title = 'Je n’avais jamais pu me contenter d’une seule vie', 3000)
	}

	setFocus($event) {
		$event.focus();
	}

}
