import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loaded = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loaded = document.readyState == 'complete' ? true : false;
    window.onload = () =>{
      this.loaded = true;
      console.log(this.loaded);
    } 
  }

}
