import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lesson: Lesson;
  index: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbService,
    private cs: CourseService,
  ) { }

  ngOnInit(): void {
    const route = this.route.snapshot.paramMap.get('dog');
    const lid = this.route.snapshot.paramMap.get('lessonId');
    console.log(route);
    
    this.cs.getCourse(route)
      .subscribe(course => {
        this.lesson = course.data().lessons[lid];   
        this.index = +lid;
        console.log(this.lesson);
        
    });
    this.__FunctionSlide();
  }

  innerYoutube(src: string){
    console.log(src);
    
    return `<iframe  width="420" height="315" src="${src}"  frameborder="0" allowfullscreen></iframe>`;
  }

  
  startIndex = -1;
  __FunctionSlide(next: Boolean = true) {
    const slides = Array.from(document.getElementsByClassName('block'));
    // if (slides === []) {
    //   this.Repeat();
    // }
    console.log(slides);
    
    for (const x of slides) {
      const y = x as HTMLElement;
      y.style.display = 'none';
    }
    
    next ? this.startIndex++ : this.startIndex--;
    
    // if (this.startIndex > slides.length - 1) {
    //   this.startIndex = 0;
    //   const slide = slides[this.startIndex] as HTMLElement;
    //   slide.style.display = 'block';
    //   next ? this.startIndex++ : this.startIndex--;
    // } 
    if (this.startIndex >= 0 && this.startIndex > slides.length - 1) {

      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';      
    }
  }

}
