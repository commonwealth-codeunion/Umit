import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from "rxjs";
import {switchMap} from 'rxjs/operators';
import { analytics } from 'firebase';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError  = new BehaviorSubject<string>(null);
          eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<User>;
  newUser: User;

  constructor(
    private Auth: AngularFireAuth,
    private db:   AngularFirestore,
    private router: Router,
  ) { 
    console.log('Run auth service!');
    
    this.user$ = this.Auth.authState.pipe(
      switchMap(user => {
        if (user)
          return this.db.doc<User>(`Users/${user.uid}`).valueChanges();
        else
          return of(null);
      })
    )
  }

  login(email: string, password: string){
    this.Auth.signInWithEmailAndPassword(email, password)
      .catch(err => this.eventAuthError.next(err.code))
      .then(user => {
        if(user) this.router.navigate(['/'])
      })
  }

  // getUserState(){
  //   return this.Auth.authState;
  // }

  createUser(user){
    this.newUser = user;

    console.log('Upload new user: ', this.newUser);
    
    this.Auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCred => {

        console.log(userCred);
        
        userCred.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCred)
          .then(() => {
            this.router.navigate(['/']);
          });
      }).catch(error =>
          this.eventAuthError.next(error.code));
  }

  insertUserData(userCredentials: firebase.auth.UserCredential){
    return this.db.doc(`Users/${userCredentials.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'User'
    })
  }

  async logout(){
    console.log('logout');
    await this.Auth.signOut();
    this.router.navigate(['/auth'])
  }
}
