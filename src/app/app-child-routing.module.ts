import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { CreatePostPageComponent } from './components/create-post-page/create-post-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { EditCategoryPageComponent } from './components/edit-category-page/edit-category-page.component';
import { LeavePageComponent } from './components/leave-page/leave-page.component';

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
        component: DashboardPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'posts',
        component: PostsPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'create-post',
        component: CreatePostPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'gallery',
        component: GalleryPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'category',
        component: CategoryPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit-category',
        component: EditCategoryPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'leave',
        component: LeavePageComponent,
        canActivate: [AuthGuardService]
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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuardService
  ],
  exports: [
    RouterModule
  ]
})
export class AppChildRoutingModule { }
