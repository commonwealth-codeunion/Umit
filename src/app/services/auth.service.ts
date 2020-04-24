import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models/user.model";
import { of } from "rxjs";
import {switchMap} from 'rxjs/operators';
import { analytics } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError  = new BehaviorSubject<string>("");
          eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<User>;
  newUser: any;
  constructor(
    private Auth: AngularFireAuth,
    private db:   AngularFirestore,
    private router: Router,
  ) { 
    this.user$ = this.Auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  login(email: string, password: string){
    this.Auth.signInWithEmailAndPassword(email, password)
      .catch(err => this.eventAuthError.next(err))
      .then(user => {
        if(user) this.router.navigate(['/home'])
      })
  }

  getUserState(){
    return this.Auth.authState;
  }

  createUser(user){
    this.newUser = user;

    this.Auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCred => {

        userCred.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCred)
          .then(() => {
            this.router.navigate(['/secret']);
          });
      }).catch(error =>
          this.eventAuthError.next(error));
  }

  insertUserData(userCredentials: firebase.auth.UserCredential){
    return this.db.doc(`Users/${userCredentials.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'Admin'
    })
  }

  async logout(){
    await this.Auth.signOut();
    this.router.navigate(['/'])
  }
}
