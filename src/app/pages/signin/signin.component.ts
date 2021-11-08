/*
Author: Travis Rosen
Date: 10/29/2021
Title: signin.component.ts
Description: Sign in page
*/

//Import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  //Defining form & error variables
  form: FormGroup;
  error: string;


  constructor( private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    //Validating that empID is a numerical value
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  //Create login function
  login(): void
  {
    const empId = this.form.controls['empId'].value;
    this.http.get('/api/employees/' + empId).subscribe(res =>{
        if (res)
        {
          //Adding employee information to session storage.
          console.log(res);
          sessionStorage.setItem('name', `${res['firstName']} ${res['lastName']}`);
          this.cookieService.set('session_user', empId, 1);
          this.router.navigate(['/']);
        }
        else
        {
          this.error = 'The employee ID you entered is invalid, please try again';
        }
    })
  }
}
