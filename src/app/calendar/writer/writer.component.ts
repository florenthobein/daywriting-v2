import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged';

import { DailyChallengeService } from '../../core/daily-challenge.service'
import { UserService } from '../../core/user.service'

import { LangService } from '../../core/lang.service'
import { StoreService } from '../../core/store.service'
import { AuthService } from '../../core/auth.service'

import { Challenge } from '../../models/challenge'
import { Mission } from '../../models/mission'

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

@Component({
	selector: 'dw-writer',
	templateUrl: './writer.component.html',
	styleUrls: ['./writer.component.css'],
})
export class WriterComponent implements OnInit {

	form: FormGroup;
	saved: boolean = true;

	modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			[{ 'align': [] }],
			['clean'],
		]
	};

	@Input() challenge: Challenge;
	@ViewChild('editor') editor: QuillEditorComponent

	constructor(private fb: FormBuilder, private langSvc: LangService,  private storeSvc:StoreService, public authSvc: AuthService) { }

	ngOnInit() {

		let text = '';
		if (this.challenge) {
			text = this.storeSvc.get(this.challenge.datekey);
		}
		this.form = this.fb.group({
			editor: [text]
		});

		this.form
			.controls
			.editor
			.valueChanges
			.debounceTime(600)
			.distinctUntilChanged()
			.subscribe(text => {
				if (this.challenge.datekey) {
					this.storeSvc.save(this.challenge.datekey, text);
					this.saved = true;
				} else {
					;// todo handle error
				}
			});
	}

	setFocus($event) {
		$event.focus();
	}

}
