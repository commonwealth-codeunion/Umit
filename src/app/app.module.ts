// Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './auth/register/register.component';
import { LendingComponent } from './lending/lending.component';
import { SecretComponent } from './secret/secret.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './main/home/home.component';
import { AppComponent } from './app.component';

import { AdminGuard } from './guard/role/admin.guard';
import { AuthGuard } from './guard/role/auth.guard';
import { environment } from "src/environments/environment";
import { AdminComponent } from './admin/admin.component';
import { SchoolsComponent } from './admin/schools/schools.component';
import { AddComponent } from './admin/schools/add/add.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { CourseComponent } from './courses/course/course.component';
import { AddLessonComponent } from './courses/add-lesson/add-lesson.component';
import { LessonComponent } from './courses/lesson/lesson.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseService } from './services/course.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    RegisterComponent,
    SecretComponent,
    LoginComponent,
    HomeComponent,
    AppComponent,
    AuthComponent,
    LendingComponent,
    AdminComponent,
    SchoolsComponent,
    AddComponent,
    CoursesComponent,
    AddCourseComponent,
    CourseComponent,
    AddLessonComponent,
    LessonComponent,
    CoursesListComponent,
    MainComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }