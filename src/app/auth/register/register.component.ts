import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authError: any;
  submitted = false;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', 
      [Validators.required,
      Validators.email]],
    password: ['', Validators.compose([Validators.required, this.validator.patternValidator()])],
    password2: ['', Validators.required],
  },
  {
    validator: this.validator.MatchPassword('password', 'password2'),
  });

  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get password2(){
    return this.registerForm.get('password2');
  }

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private validator: ValidateService,
  ) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }

  createUser(frm) {
    console.log(frm.form.value);
    this.auth.createUser(frm.form.value);
  }

  signup(){
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }

  login(){
    this.router.navigate(['/auth/login']);
  }
}
