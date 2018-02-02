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
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { AppChildRoutingModule } from './app-child-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { GalleryCoverComponent } from './components/gallery-cover/gallery-cover.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginBoxComponent,
    DashboardPageComponent,
    ErrorAlertComponent,
    DefaultLayoutComponent,
    SideMenuComponent,
    GalleryPageComponent,
    LogoutButtonComponent,
    GalleryCoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppChildRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
