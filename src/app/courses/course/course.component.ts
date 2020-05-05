import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  user: firebase.User;
  course;
  route: string;
  subscribe = false;
  userRef;
  userFull;

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private cs: CourseService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.route = this.rout.snapshot.paramMap.get('dog');
    console.log(this.route);
    
    this.cs.getCourse(this.route)
      .subscribe(course => {
        this.course = course.data();  
        console.log('Course was loaded, ', this.course);
         
      })
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
        this.userRef = this.db.doc<User>('Users/'+this.user.uid)
        this.userFull = this.userRef.valueChanges();

        this.userFull.subcribe(user => {
          user.courses.map(i => i.cid == this.route ? this.subscribe = true : null );
        });
        console.log(user.uid);

      })
  }

  addLesson(){
    this.router.navigate(['add-lesson'], {relativeTo: this.rout})
  }

  getToLesson(index: number){
    this.router.navigate(['read/'+index], {relativeTo: this.rout})
  }
  
  change(){
    alert('Change the course');
  }

  continue(){
    alert('Redirect to leesson');
  }

  getSubscribe(){
    this.userFull.subscribe(user => {
      user.courses.push({
        cid: this.route,
        lastLesson: 0,
        complete: false
      })
      this.userRef.update({courses: user.courses})
        .then(() => this.getToLesson(0))
        .catch(err => console.error(err));
    })      
  }
}
