import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Routing
import { AppRoutingModule } from '../app-routing.module';

// Core
// import { CoreModule } from '../core/core.module'

// Components
import { CalendarComponent } from './calendar.component'
import { WriterComponent } from './writer/writer.component'
import { WritingPreviewComponent } from './writing-preview/writing-preview.component';

// Shared module
import { SharedModule } from '../shared/shared.module'
// import { Datekey2DatePipe, Date2DatekeyPipe } from '../shared/datekey.pipe'

// External
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { QuillModule } from 'ngx-quill';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		// CoreModule,
		SharedModule,
		ScrollToModule.forRoot(),
		QuillModule,
	],
	declarations: [
		CalendarComponent,
		WriterComponent,
		WritingPreviewComponent,
	],
	exports: [
		CalendarComponent
	]
})
export class CalendarModule { }
