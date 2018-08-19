import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Datekey2DatePipe, Date2DatekeyPipe } from './datekey.pipe';
import { CalendarizePipe } from './calendarize.pipe';
import { TextLangPipe } from './text-lang.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Datekey2DatePipe,
    Date2DatekeyPipe,
    CalendarizePipe,
    TextLangPipe
  ],
  exports: [
    Datekey2DatePipe,
    Date2DatekeyPipe,
    CalendarizePipe,
    TextLangPipe
  ],
  providers: [
    Datekey2DatePipe,
    Date2DatekeyPipe,
    CalendarizePipe,
    TextLangPipe
  ]
})
export class SharedModule {
}
