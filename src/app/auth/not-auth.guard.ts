import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import * as Url from 'url';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private _authGuard: AuthGuard, private _router: Router) {
  }

  // complex way of fixing that /auth cannot be visited, better way would  be to copy auth.guard and negate the stuff we do there, here
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return (<Observable<boolean | UrlTree>> this._authGuard.canActivate(route, state))
      .pipe(
        map(val => {
          if (typeof(val) === 'boolean' && val) {
            return this._router.createUrlTree(['/recipes']);
          }
          
          return true;
        })
      )
  }
}
