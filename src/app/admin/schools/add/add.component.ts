import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  admin = this.fb.group({
    name: ['', Validators.required],
    job: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
  });
  // director = { ...this.admin, job: new FormControl({value: 'Директор', disabled: true}) }
  // director2 = { ...this.admin, job: new FormControl({value: 'Завуч', disabled: true}) }
  schoolForm = this.fb.group({
    name: ['', Validators.required],
    admins: this.fb.array([]), 
  });

  Jobs: any = ['Директор', 'Завуч', 'Системный администратор', 'Секретарша']

  get admins() {
    return this.schoolForm.get('admins') as FormArray;
  }

  addAdmin(){
    this.admins.push(this.admin);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.schoolForm.value);
    
  }

  changeJob(e, i) {
    console.log(this.admins.controls[i]);
    
    this.admins.controls[i].job.setValue(e.target.value, {
      onlySelf: true 
    })
  }

}
