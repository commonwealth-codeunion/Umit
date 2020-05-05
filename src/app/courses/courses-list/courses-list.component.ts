import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses;
  user;

  constructor(
    private router: Router,
    private cs: CourseService,
    private db: DbService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.cs.getCourses()
      .subscribe(courses => {
          this.courses = courses;
          console.log(courses);
          
      })
    this.auth.user$.subscribe(user => {
      this.user = user;
      console.log(user);
      
    });
  }

  addCourse(){
    this.router.navigate(['courses/add']);
  }

  getCourse(cid){
    console.log(cid);

    this.router.navigate(['courses/'+cid]);
  }

  getNumbersOfLesson(course): string{
    let count = course.lessons.length;
    if(count == 1) return count+' урок';
    else if(count % 2 || count % 3 || count % 4) return count+' урока';
    else return count+' уроков';
  }
}
