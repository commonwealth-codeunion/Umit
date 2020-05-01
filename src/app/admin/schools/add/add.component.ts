import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  schoolForm = this.fb.group({
    name: ['', Validators.required],
    admins: this.fb.array([]), 
  });

  Jobs: any = ['Директор', 'Завуч', 'Системный администратор', 'Секретарша']

  get admins() {
    return this.schoolForm.get('admins') as FormArray;
  }

  addAdmin(){
    this.admins.push(
      this.fb.group({
        name: ['', Validators.required],
        job:  ['', Validators.required],
        email: ['', Validators.email],
        phone: [''],
      })
    );
  }

  constructor(
    private fb: FormBuilder,
    private db: DbService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.schoolForm.value);
    this.db.addSchool(this.schoolForm.value);
  }

  changeJob(e, i) {
    console.log(this.admins);
    
    // this.admins.controls[i].controls['job'].setValue(e.target.value, {
      // onlySelf: true 
    // })
  }

}
