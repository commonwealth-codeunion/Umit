import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './main/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guard/role/auth.guard';
import { SecretComponent } from './secret/secret.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';
import { AdminGuard } from './guard/role/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { SchoolsComponent } from './admin/schools/schools.component';
import { AddComponent } from './admin/schools/add/add.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { LessonComponent } from './courses/lesson/lesson.component';
import { AddLessonComponent } from './courses/add-lesson/add-lesson.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseComponent } from './courses/course/course.component';
import { LoginGuard } from './guard/role/login.guard';
import { MainComponent } from './main/main.component';
import { redirectUnauthorizedTo, canActivate, AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/auth';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,     
        canActivate: [AngularFireAuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLanding
        },
      },
      {
        path: 'courses',
        component: CoursesComponent,    
        canActivate: [AngularFireAuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLanding
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'prefix'
          },
          {
            path: 'list',
            component: CoursesListComponent,
            data: {animation: 'listPage'}
          },
          {
            path: 'add',
            component: AddCourseComponent,
            // canActivate: [AdminGuard],
            data: {animation: 'addPage'}
          },
          {
            path: 'add-lesson',
            component: AddLessonComponent,
            data: {animation: 'lessonAddPage'}
          },
          {
            path: ':dog',
            children: [
              {
                path: '',
                component: CourseComponent,
              },
              {
                path: 'read/:lessonId',
                component: LessonComponent
              },
              {
                path: 'add-lesson',
                component: AddLessonComponent
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    // canActivate: [LoginGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'prefix'
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'singup',
            component: RegisterComponent
          }
        ]
      }
    ]
  },
  {
    path: 'secret',
    component: SecretComponent,
    // canActivate: [AdminGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'schools',
            pathMatch: 'prefix'
          },
          {
            path: 'schools',
            component: SchoolsComponent,
            children: [
              {
                path: '',
                redirectTo: 'add',
                pathMatch: 'prefix'
              },
              {
                path: 'add',
                component: AddComponent,
              }
            ]
          }
        ]
      }
    ]
  }
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
