import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  
  user$: firebase.User;
  loaded = false;
  constructor(
    private router: Router,
    private auth: AuthService  
  ) { }

  ngOnInit(): void {
    window.onload = () => this.loaded = true;
  }

  login(){
    this.router.navigate(['/auth/login']);
  }

  register(){
    this.router.navigate(['/auth/singup']);
  }
  
}
