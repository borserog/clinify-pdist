import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { State, Store } from '@ngrx/store';
import { AuthState } from './reducers';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.handleAuthGuard();
  }

  handleAuthGuard(): Observable<boolean | UrlTree> {
    return this.authService.isUserLogged(this.store).pipe(
      map(isUserLogged => {
        if (!isUserLogged) { return this.router.parseUrl('login'); }

        return isUserLogged;
      })
    );
  }
}
