import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy{
  lessonEdit = false;
  lesson = this.fb.group({
    subject: [''],
  }); 
  currentLesson = new BehaviorSubject(this.lesson);
  actualLesson = {
    lessonIndex: -1,
    lessonGroup: this.lesson
  };
  lessons = this.fb.array([]);
  courseForm = this.fb.group({
    name: ['', Validators.required],
    description: [''], 
    lessons: this.lessons
  });

  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private cs: CourseService,
    private router: Router
  ) { }

  // courseForm: FormGroup;


  ngOnInit(): void {
    // this.cs.coursEdit.subscribe(course => this.courseForm = course);
    // console.log(this.courseForm.value);
    console.log('Add-course Init!');
  }

  ngOnDestroy(){
    // console.log(this.courseForm.value);
    // this.cs.coursEdit.next(this.courseForm);
  }

  addLesson(index = -1){
    // this.router.navigate(['courses/add-lesson'],  { skipLocationChange: true })
    let lessons = this.lessons.controls;
    if(index >= 0 && lessons[index]){
      this.currentLesson.next(lessons[index] as FormGroup)
      this.actualLesson.lessonIndex = index
    } 
    this.lessonEdit = true;
  }

  saveLesson(lesson){
    console.log('Index: ', lesson.lessonIndex);
    console.log('Value: ', lesson.lessonGroup);
    
    let newLesson = this.fb.group({
      subject: lesson.lessonGroup.subject
    });
    if(lesson.lessonIndex >= 0)
      this.lessons.setControl(lesson.lessonIndex, newLesson);
    else
      this.lessons.push(newLesson);
    

    console.log(this.lessons.value);
    this.lessonEdit = false;

    this.actualLesson.lessonIndex = -1;
    this.currentLesson.next(this.lesson);
  }

  openLesson(index: number){

  }

  onSubmit(){
    console.log(this.courseForm.value);
    
    this.db.addCourse(this.courseForm.value)
      .then(() => {
        this.router.navigate(['courses/list'])
      })
  }

}
