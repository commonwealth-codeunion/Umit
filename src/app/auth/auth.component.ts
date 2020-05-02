import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    password2: [''],
  })
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
