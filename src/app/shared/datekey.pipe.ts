import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'datekey2date'
})
export class Datekey2DatePipe implements PipeTransform {
	transform(datekey: string): Date {
		let day = parseInt(datekey.substring(0, 2), 10);
		let month = parseInt(datekey.substring(3, 5), 10);
		let year = parseInt(datekey.substring(6, 8), 10);
		return new Date(2000+year, month-1, day);
	}
}

@Pipe({
	name: 'date2datekey'
})
export class Date2DatekeyPipe implements PipeTransform {
	transform(date: Date): string {
		let d = date.getUTCDate() < 10 ? '0'+date.getUTCDate() : ''+date.getUTCDate();
		let m = date.getUTCMonth() < 9 ? '0'+(date.getUTCMonth()+1) : ''+(date.getUTCMonth()+1);
		let y = ''+(date.getUTCFullYear()-2000);
		return `${d}-${m}-${y}`;
	}
}
