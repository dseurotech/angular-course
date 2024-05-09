import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

import { map, take } from "rxjs";

import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.store.select(fromAuth.currentUser).pipe(
      take(1),
      map(usr => {
        const userIsValid = !!usr?.token;
        if (userIsValid) {
          return true;
        }
        return this, this.router.createUrlTree(["/auth"]);
      }));
  }
}