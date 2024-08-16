import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { MainPageComponent } from './main-page/main-page.component';

//to set up the
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'loading', component: LoadingPageComponent},
  {path: 'main', component: MainPageComponent}

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule]
})
export class AppRoutingModule { }
 