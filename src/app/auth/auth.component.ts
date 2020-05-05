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
    window.onload = () => this.loaded = true;
  }

}
