import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ChallengeGuard } from './challenge.guard';

export const allRoutes: Routes = [
  {path: '', data: {showWriter: true}, component: HomeComponent},
  {path: 'write/:datekey', data: {showWriter: true}, component: HomeComponent, canActivate: [ChallengeGuard]},
  {path: 'calendar', component: HomeComponent},
  // {
  // 	path: '',
  // 	component: HomeComponent,
  // 	// canActivate: [ AuthGuard ],
  // 	children: [
  // 		{ path: '', component: HomeComponent },
  // 		{ path: 'write/:id', component: HomeComponent },
  // 	]
  // },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(allRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
