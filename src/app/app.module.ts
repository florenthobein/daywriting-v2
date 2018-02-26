// todo
// polyfill https://github.com/web-animations/web-animations-js

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Core module
import { CoreModule } from './core/core.module';

// Feature modules
import { CalendarModule } from './calendar/calendar.module';

// Layout components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

// Guards
import { ChallengeGuard } from './challenge.guard';

// Service workers
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		NavBarComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ServiceWorkerModule
			.register('/ngsw-worker.js', { enabled: environment.production }),
		CoreModule,
		CalendarModule,
		AppRoutingModule
	],
	providers: [ChallengeGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
