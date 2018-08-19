import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


import { AuthService } from './auth.service';
import { RestService } from './rest.service';
import { LangService } from './lang.service';

import { UserService } from './user.service';
import { DailychallengeService } from './dailychallenge.service';
import { MissionService } from './mission.service';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { environment } from '@env/environment';

export function tokenGetter() {
  return localStorage.getItem(environment.id_token);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  exports: [/* components */],
  declarations: [/* components */],
  providers: [
    AuthService,
    RestService,
    LangService,
    UserService,
    DailychallengeService,
    MissionService,
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
