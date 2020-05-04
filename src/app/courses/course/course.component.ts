import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  user: User;
  course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbService,
    private cs: CourseService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    const route = this.route.snapshot.paramMap.get('dog');
    console.log(route);
    
    this.cs.getCourse(route)
      .subscribe(course => {
        this.course = course.data();  
        console.log('Course was loaded, ', this.course);
         
      })
    // this.auth.user$
    //   .subscribe(user => {
    //     this.user = user;
    //   })
  }

  addLesson(){
    this.router.navigate(['add-lesson'], {relativeTo: this.route})
  }

  getToLesson(index: number){
    this.router.navigate(['read/'+index], {relativeTo: this.route})
  }
}
