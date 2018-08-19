import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { challengesReducer } from './reducers/challenge.reducer';


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

// Locale
import { LangService } from './core/lang.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

// AppModule
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
    AppRoutingModule,
    StoreModule.forRoot({ challenges: challengesReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
  ],
  providers: [
    ChallengeGuard,
    // { provide: TRANSLATIONS,
    //   deps: [ LangService ],
    //   useFactory: (svc: LangService) => getTranslation(svc.getLang()) },
    {
      provide: LOCALE_ID,
      deps: [ LangService ],
      useFactory: (svc: LangService) => svc.getLang()
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
