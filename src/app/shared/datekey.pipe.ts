import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'datekey'
})
export class DatekeyPipe implements PipeTransform {

	transform(datekey: string): Date {
		let day = parseInt(datekey.substring(0, 2), 10);
		let month = parseInt(datekey.substring(3, 5), 10);
		let year = parseInt(datekey.substring(6, 8), 10);
		return new Date(2000+year, month-1, day);
	}

}
