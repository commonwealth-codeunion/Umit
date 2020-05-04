import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy{
  user: User;
  lessonEdit = false;
  currentLesson$ = new BehaviorSubject(null);
  courseForm = this.fb.group({
    name: ['', Validators.required],
    description: [''], 
    lessons: this.fb.array([])
  });
  

  get lessons(): FormArray{
    return this.courseForm.get('lessons') as FormArray;
  }
  

  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private cs: CourseService,
    private router: Router,
    private auth: AuthService,
  ) { }

  // courseForm: FormGroup;


  ngOnInit(): void {
    // this.cs.coursEdit.subscribe(course => this.courseForm = course);
    // console.log(this.courseForm.value);
    console.log('Add-course Init!');
    // this.auth.user$
    //   .subscribe(user => {
    //     console.log(user);
        
    //     this.user = user;
    //   })
  }

  ngOnDestroy(){
    // console.log(this.courseForm.value);
    // this.cs.coursEdit.next(this.courseForm);
  }

  saveLesson(lesson: FormGroup){
    // this.currentLesson$.next(this.lesson);
    // this.lessons.push(this.lesson);
    this.lessonEdit = false;

    console.log(this.courseForm.value);
  }

  editLesson(index: number){
    this.currentLesson$.next(this.lessons.controls[index]);
    this.lessonEdit = true;
  }

  addLesson(){
    // this.router.navigate(['courses/add-lesson'],  { skipLocationChange: true })
    this.lessons.push(
      this.fb.group({
        subject: [''],
        blocks: this.fb.array([
          this.fb.group({
            name: ['', Validators.required],
            type: ['html', Validators.required],
            content: ['']
          })
        ])
    }));
    this.currentLesson$.next(this.lessons.controls[this.lessons.controls.length-1]);
    this.lessonEdit = true;
  }

  // saveLesson(lesson: FormGroup, index: number = -1){
  //   console.log('Index: ', index);
  //   console.log('Value: ', lesson);

  //   if(index >= 0)
  //     this.lessons.setControl(index, lesson);
  //   else
  //     this.lessons.push(lesson);
    

  //   console.log(this.lessons.value);
  //   this.lessonEdit = false;

  //   this.actualLesson.lessonIndex = -1;
  //   this.currentLesson$.next(this.lesson);
  // }

  openLesson(index: number){

  }

  onSubmit(){
      const course = 
        this.courseForm.value;
      //   ...{
      //     author: this.user.uid
      //   }
      // }
      console.log(this.user);
      
      this.db.addCourse(course)
        .catch(err => console.error(err))
        .then(() => {
          this.router.navigate(['courses/list'])
        })
    }

}
