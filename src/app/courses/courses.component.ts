import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animations';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [
    slideInAnimation,
  ]
})
export class CoursesComponent implements OnInit {

 
  user: User;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  
}
