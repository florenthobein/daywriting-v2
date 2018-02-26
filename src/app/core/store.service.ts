// Store writings

import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

	constructor() { }

	size(datekey: string): number {
		let storekey = `writing:${datekey}`
		let stack = localStorage.getItem(storekey) ? JSON.parse(localStorage.getItem(storekey)) : [];
		return stack.length;
	}

	get(datekey: string, shift: number = 0): string {
		let storekey = `writing:${datekey}`
		let stack = localStorage.getItem(storekey) ? JSON.parse(localStorage.getItem(storekey)) : [];
		let l = stack.length;
		if (shift < 0 || (l-shift) <= 0)
			return '';
		return stack[l-shift-1].text;
	}

	save(datekey: string, text: string) {
		let storekey = `writing:${datekey}`
		let stack = localStorage.getItem(storekey) ? JSON.parse(localStorage.getItem(storekey)) : [];
		// console.log('store', storekey, JSON.stringify({
		// 	'date': new Date(),
		// 	'text': text
		// }));
		stack.push({
			'date': new Date(),
			'text': text
		});
		localStorage.setItem(storekey, JSON.stringify(stack));
	}

}
