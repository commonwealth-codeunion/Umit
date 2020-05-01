import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses;
  course$: Observable<any>;

  // coursEdit = new BehaviorSubject();
  // set courseUpdate(coursesArray: Array<any>){
  //   coursesArray.map(i => i = i.payload.)
  // } 

  constructor(
    private db: DbService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
  ) { 
  }

  

  getCourses(){
    return this.firestore.collection("Courses").snapshotChanges();
  }

  getCourse(cid){
    return this.firestore.collection("Courses").doc(cid).get();
  }

  getLesson(){
    console.log("CC ");
  }

  addLesson(cid, lesson){
    this.firestore.collection("Courses").doc(cid).get().toPromise()
      .then(course => {
        console.log(course);
        
      })
  }

  
}
