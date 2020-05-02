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

  addSchool(school){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("Schools")
          .add(school)
          .then(res => {}, err => reject(err));
    });
  }

  getSchools(){
    return this.firestore.collection("Schools").snapshotChanges();
  }

  getCourse(cid: string){
    return this.firestore.collection("Courses").doc(cid).get();
  }

  addCourse(course){
    return this.firestore
          .collection("Courses")
          .add(course);
  }

}
