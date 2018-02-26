// Store writings

import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

	constructor() { }

	get(datekey: string, shift?: number = 0): string {
		let storekey = `writing:${datekey}`
		let stack = localStorage.getItem(storekey) ? JSON.parse(localStorage.getItem(storekey)) : [];
		let l = stack.length;
		if (shift < 0 || (l-shift) <= 0)
			return '';
		return stack[l-shift-1];
	}

	save(datekey: string, text: string) {
		let storekey = `writing:${datekey}`
		let stack = localStorage.getItem(storekey) ? JSON.parse(localStorage.getItem(storekey)) : [];
		localStorage.setItem(storekey, JSON.stringify({
			'date': new Date(),
			'text': text
		}));
	}

}
