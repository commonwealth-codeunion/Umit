import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    slideInAnimation,
  ]
})
export class MainComponent implements OnInit {
  loaded = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('Run main component!');
    this.loaded = document.readyState == 'complete' ? true : false;
    window.onload = () => 
      this.loaded = true;
  }

  
  logout(){
    this.auth.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
