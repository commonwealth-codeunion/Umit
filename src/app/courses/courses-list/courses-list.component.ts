import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses;

  constructor(
    private router: Router,
    private cs: CourseService,
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.cs.getCourses()
      .subscribe(courses => {
          this.courses = courses;
      })
  }

  addCourse(){
    this.router.navigate(['courses/add']);
  }

  getCourse(cid){
    console.log(cid);

    this.router.navigate(['courses/'+cid]);
  }
}
