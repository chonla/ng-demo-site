import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: 'user',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
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
export class AppChildRoutingModule { }
