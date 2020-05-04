import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  user: User;
  users;

  constructor(
    private auth: AuthService,
    private db: DbService,
  ) { }

  ngOnInit(): void {
    // this.auth.user$
    //   .subscribe(user => {
    //     this.user = user;
    //   });
    this.db.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users[0].payload.doc.data());
        
      })
  }

}
