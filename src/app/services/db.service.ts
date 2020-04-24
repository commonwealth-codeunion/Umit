import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getUsers(){
    return this.firestore.collection("Users").snapshotChanges();
  }
}
