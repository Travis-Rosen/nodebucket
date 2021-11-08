/*
Author: Travis Rosen
Name: base-layout.component.ts
Date: 11/7/2021
Description: base layout component ts file
*/

//Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  //Defining variables
  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    console.log('isLoggedIn: ' + this.isLoggedIn);
   }
   //Logging user signed in
  ngOnInit(): void {
    console.log('inside the ngOnInit of the base-layout.component.html file');
    this.name = sessionStorage.getItem('name');
    console.log('Logged in user name ' + this.name);
  }
  //Sign out function to log out current user and redirect to sign in page.
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
