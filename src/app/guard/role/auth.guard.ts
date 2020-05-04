import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from '../../services/auth.service'
import { Observable } from 'rxjs';
import { tap, map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      console.log('Run auth guard!');
      if(true){
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
  }
}