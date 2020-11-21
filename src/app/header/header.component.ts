import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-header',
  template: `
    <nav class ="navbar is-dark is-bold">
      <!-- Logo -->
      <div class = "navbar-brand">
       <a class = "navbar-item" routerLink="Home">
        CrsX
       </a>
       </div>

          <!-- menu -->
      <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" routerLink="Home">Home</a>
        <a class="navbar-item" routerLink="Contact">Contact</a>
        <a class="navbar-item" routerLink="Rent">Rent</a>
      </div>
      <div *ngIf="this.loggedIn() == null" class="navbar-end">
        <a class="navbar-item" routerLink="Login">Login</a>
        <a class="navbar-item" routerLink="Register">Register</a>
      </div>
      <div *ngIf="this.loggedIn() != null" class="navbar-end">
        <a class="navbar-item" [routerLink]="['/User', this.loggedInUser.id]">{{this.loggedInUser.firstName}} {{this.loggedInUser.lastName}}</a>
        <a class="navbar-item" (click)="this.Logout()">Logout</a>
      </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  loggedInUser : User;
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }
  public loggedIn(){
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loginService.loggedInUser;
  }
  public Logout(){
    this.loggedInUser = null;
    this.loginService.loggedInUser = null;
  }

}
