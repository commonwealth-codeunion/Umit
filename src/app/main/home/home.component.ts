import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  loaded = false;
  courses = {
    subscribed: [],
    сompleted: [],
    recommended: []
  }

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('Run home component!');
    
    this.auth.user$
      .subscribe(user => {
        this.user = user;
        console.log(user);
        
      });
    this.loaded = document.readyState == 'complete' ? true : false;
    window.onload = () => this.loaded = true;
  }

  myFunction() {
    var x = document.getElementById("navBar");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }

  getNumbersOfLessons(count: number):string{
    return count+' Уроков'
  }
}
