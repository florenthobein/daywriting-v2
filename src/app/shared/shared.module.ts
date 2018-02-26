import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Datekey2DatePipe, Date2DatekeyPipe } from './datekey.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		Datekey2DatePipe,
		Date2DatekeyPipe
	],
	exports: [
		Datekey2DatePipe,
		Date2DatekeyPipe
	],
	providers: [
		Datekey2DatePipe,
		Date2DatekeyPipe
	]
})
export class SharedModule { }
