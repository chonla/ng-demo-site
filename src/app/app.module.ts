import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { AuthService } from './services/auth.service';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginBoxComponent,
    DashboardPageComponent,
    ErrorAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
