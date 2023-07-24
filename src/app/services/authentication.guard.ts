import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {

    if (localStorage.getItem('isLoggedIn')) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['']);
      return false;
    }
  }
}
