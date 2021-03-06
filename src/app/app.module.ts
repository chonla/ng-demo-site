import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { ResourceDirective } from './directives/resource.directive';
import { HttpClientModule } from '@angular/common/http';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { FirebaseResourceDirective } from './directives/firebase-resource.directive';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CreatePostPageComponent } from './components/create-post-page/create-post-page.component';
import { QuillModule } from 'ngx-quill';
import { DataService } from './services/data.service';
import { DataSyncService } from './services/data-sync.service';
import { DashIfEmptyPipe } from './pipes/dash-if-empty.pipe';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ThDatePipe } from './pipes/th-date.pipe';
import { PostRowComponent } from './components/post-row/post-row.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CategoriesCheckboxesComponent } from './components/categories-checkboxes/categories-checkboxes.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryRowComponent } from './components/category-row/category-row.component';
import { CategoryCollapsibleFormComponent } from './components/category-collapsible-form/category-collapsible-form.component';
import { TagsAdderComponent } from './components/tags-adder/tags-adder.component';
import { CreateLoginComponent } from './components/create-login/create-login.component';
import { EditCategoryPageComponent } from './components/edit-category-page/edit-category-page.component';
import { LoadingModalService } from './services/loading-modal.service';
import { LeavePageComponent } from './components/leave-page/leave-page.component';

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
    GalleryCoverComponent,
    GalleryListComponent,
    ResourceDirective,
    PostsPageComponent,
    PostsListComponent,
    FirebaseResourceDirective,
    OrderByPipe,
    CreatePostPageComponent,
    DashIfEmptyPipe,
    SuccessAlertComponent,
    LoadingModalComponent,
    ThDatePipe,
    PostRowComponent,
    ConfirmModalComponent,
    CategoriesCheckboxesComponent,
    CategoryFormComponent,
    CategoryPageComponent,
    CategoriesListComponent,
    CategoryRowComponent,
    CategoryCollapsibleFormComponent,
    TagsAdderComponent,
    CreateLoginComponent,
    EditCategoryPageComponent,
    LeavePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppChildRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    QuillModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule
  ],
  entryComponents: [
    CreateLoginComponent,
    ErrorAlertComponent,
    LoadingModalComponent
  ],
  providers: [
    AuthService,
    DataService,
    DataSyncService,
    LoadingModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
