import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guard/role/auth.guard';
import { SecretComponent } from './secret/secret.component';
import { AuthComponent } from './auth/auth.component';
import { LendingComponent } from './lending/lending.component';
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

const routes: Routes = [
  {
    path: '',
    component: LendingComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
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
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
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
        canActivate: [AdminGuard],
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
  {
    path: 'secret',
    component: SecretComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
