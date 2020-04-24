// Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { RegisterComponent } from './auth/register/register.component';
import { LendingComponent } from './lending/lending.component';
import { SecretComponent } from './secret/secret.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

import { AdminGuard } from './guard/role/admin.guard';
import { AuthGuard } from './guard/role/auth.guard';
import { environment } from "src/environments/environment";
import { AdminComponent } from './admin/admin.component';
import { SchoolsComponent } from './admin/schools/schools.component';
import { AddComponent } from './admin/schools/add/add.component';

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
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
