import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from '../../services/auth.service'
import { Observable } from 'rxjs';
import { tap, map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      console.log(state.url);
      
      return this.auth.user$.pipe(
           take(1),
           map(user => state.url.includes('/auth') ? !user : !!user),
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied');
               this.router.navigate(['/home']);
             }
             console.log(loggedIn);
             
         })
    )
  }
}