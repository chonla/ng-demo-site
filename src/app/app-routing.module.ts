import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
