import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss']
})
export class LendingComponent implements OnInit {
  
  user$: firebase.User;

  constructor(
    private router: Router,
    private auth: AuthService  
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/auth/login']);
  }

  register(){
    this.router.navigate(['/auth/singup']);
  }
  
}
