import { Component, OnInit, Input, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  @Input() actualLesson: BehaviorSubject<FormGroup>;
  @Input() lessonIndex: number = -1;

  isCourseEditor = true;
  lesson = this.fb.group({
    subject: [''],
  });

  constructor(
    private cs: CourseService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.actualLesson.subscribe(lesson => {
      lesson ? this.lesson = lesson : null;
    });
    const route = this.route.snapshot.paramMap.get('dog');
    console.log(route);
    if(route) this.isCourseEditor = false; 
  }

  
  saveLesson(){
    console.log(this.lesson.value);
    if(this.isCourseEditor){
      this.onSubmit.emit({
        lessonGroup: this.lesson.value,
        lessonIndex: this.lessonIndex,
      });
    } else{ 
      this.cs.addLesson(this.route, this.lesson.value);}
    this.lesson.reset();
  }

}
