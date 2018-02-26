import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { AppRoutingModule } from '../app-routing.module';

// Components
import { CalendarComponent } from './calendar.component'
import { WriterComponent } from '../writer/writer.component'
import { WritingPreviewComponent } from '../writing-preview/writing-preview.component';

// Shared
import { DatekeyPipe } from '../shared/datekey.pipe'

// External
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { QuillModule } from 'ngx-quill';

@NgModule({
	imports: [
		CommonModule,
		AppRoutingModule,
		ScrollToModule.forRoot(),
		QuillModule
	],
	declarations: [
		CalendarComponent,
		WriterComponent,
		DatekeyPipe,
		WritingPreviewComponent,
	],
	exports: [
		CalendarComponent
	]
})
export class CalendarModule { }
