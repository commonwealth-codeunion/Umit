import { Component, OnInit, Input, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
  

import  '../../../../node_modules/froala-editor/js/plugins/video.min';
import  '../../../../node_modules/froala-editor/js/plugins/image.min';
import  '../../../../node_modules/froala-editor/js/plugins/align.min';
import  '../../../../node_modules/froala-editor/js/plugins/font_size.min';
import  '../../../../node_modules/froala-editor/js/plugins/font_family.min';
import  '../../../../node_modules/froala-editor/js/languages/ru';
import  "../../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: [
    './add-lesson.component.scss',
    '../../../../node_modules/froala-editor/css/plugins/image.min.css',
    '../../../../node_modules/froala-editor/css/plugins/video.min.css',

  ]
})
export class AddLessonComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Input() actualLesson: BehaviorSubject<FormGroup>;
  @Input() lessonIndex: number = -1;

  isCourseEditor = true;
  submitted = false;
  selected = false;
  currentBlock = new BehaviorSubject(0);
  types = ['html', 'video', 'file'];

  currentLesson = this.fb.group({
    subject: [''],
    blocks: this.fb.array([
      this.fb.group({
        name: ['', Validators.required], 
        type: ['', Validators.required],
        content: ['']
      })
    ])
  });

  get blocks(): FormArray{
    return this.currentLesson.get('blocks') as FormArray;
  }

  editor(){
    return {
      language: 'ru',
      charCounterCount: true,
      imageUpload: true,
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 
      'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 
      'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 
      'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 
      'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 
      'undo', 'redo'],
      placeholderText: 'Введите текст',
      heightMin: 100,
    }
  }

  constructor(
    private cs: CourseService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.actualLesson.subscribe(lesson => {
      lesson ? this.currentLesson = lesson : null;
    });
    const route = this.route.snapshot.paramMap.get('dog');
    if(route) this.isCourseEditor = false; 

    console.log(this.blocks.controls[0].get('name'));
    console.log(this.blocks.controls[0]);
    
  }

  pushBlock(name: string = '', type: string = 'html', content: string = ''){
    this.selected = true;
    if(this.blocks.valid){
      this.blocks.push(
        this.fb.group({
          name: [name, Validators.required],
          type: [type, Validators.required],
          content: [content]
        }));
      this.currentBlock.next(this.blocks.value.length-1);
      this.selected = false;
      console.log(this.selected);
    }
  } 

  saveLesson(){
    this.submitted = true;
    this.selected = true;
    if(this.currentLesson.valid){
      this.currentBlock.next(0);
      this.submitted = false;
      this.selected = false;
      this.onSubmit.emit(this.currentLesson);
    }
    // if(this.isCourseEditor){
    //   this.onSubmit.emit({
    //     lessonGroup: this.lesson.value,
    //     lessonIndex: this.lessonIndex,
    //   });
    // } else{ 
    //   this.cs.addLesson(this.route, this.lesson.value);}
    // this.lesson.reset();
  }

  openSelect($event: MouseEvent){
    if(this.blocks.valid){
      document.querySelector('.select').classList.toggle('open'); 
    }
  }

  selectBlock(index: number){
    if(index == this.currentBlock.value) return;
    this.selected = true;
    if(this.blocks.valid){
      this.selected = false;
      this.currentBlock.next(index);
    }
  }

  chageType(type: string){
    this.blocks.setControl(this.currentBlock.value, this.fb.group({
      name: [this.blocks.value[this.currentBlock.value].name, Validators.required],
      type: [type, Validators.required],
      content: ['']
    }));
  }

  getType(type: string){
    switch(type){
      case 'html':
        case 'text':
          return 'Текстовый блок';
      break;
      case 'youtube':
        case 'video':
          return 'Видео блок';
      break;
      case 'file':
        return 'Файловый блок';
      break;
      default:
        return 'Блок'
    }
  }
}
