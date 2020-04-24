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
