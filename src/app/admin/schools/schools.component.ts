import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  schools;
  formError;
  
  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.db.getSchools()
      .subscribe(schools => {
        this.schools = schools;
      });
  }

}
