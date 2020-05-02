import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;
  submitted = false;
  loginForm = this.fb.group({
    email: ['', 
      [Validators.required,
      Validators.email]],
    password: ['', Validators.required],
  });

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      switch(data.code){
        case 'auth/wrong-password':  
          this.authError = 'Неверный пароль';
        break;
        case 'auth/user-not-found':  
          this.authError = 'Пользователя с такой почтой не существует';
        break;
        case 'auth/too-many-requests':
          this.authError = 'Слишком много попыток входа, попробуйте позже'
        break;
        default: 
          this.authError = data.message;
      }
      console.log(data);
      
    });
  }

  login(){
    this.submitted = true;
    const user = this.loginForm.value;
    if (this.loginForm.valid) {
      console.log('Login...');
      console.table(user);
      this.auth.login(user.email, user.password);
    }
  }

  register(){
    this.router.navigate(['/auth/singup']);
  }


}
