import { Component, OnInit } from '@angular/core';
import { credentials } from 'src/shared/constant/credentials';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  email = "";
  pass = "";
  logintxt = "";

  onSubmit() {
    // Check if the entered email and password match any credentials
    for (const credential of credentials) {
      if (credential.email == this.email && credential.password == this.pass) {
        // Set the logged-in user
        localStorage.setItem('userName', credential.name);
        localStorage.setItem('isLoggedIn', 'true');
        // Navigate to the home page
        this.router.navigate(['home']);
        return;
      }
    }
    // Display login failed message
    this.logintxt = "Login Failed";
  }
}
