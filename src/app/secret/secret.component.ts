import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  user: firebase.User;
  users;

  constructor(
    private auth: AuthService,
    private db: DbService,
  ) { }

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    this.db.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users[0].payload.doc.data());
        
      })
  }

}
