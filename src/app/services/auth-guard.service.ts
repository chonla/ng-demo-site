
import {tap, map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';




@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      take(1),
      map(state => !!state),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      }),);
  }

}
