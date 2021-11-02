/*
Author: Travis Rosen
Date: 10/29/2021
Title: auth.guard.ts
Description: Authorization file for sign in
*/


//Import statements
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }
  //Configuring sign in function
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');
    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
