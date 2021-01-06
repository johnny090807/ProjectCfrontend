import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  template: `
    <nav class ="navbar is-dark is-bold">
      <!-- Logo -->
      <div class = "navbar-brand">
       <a class = "navbar-item" routerLink="Home">
        {{this.title}}
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
      <a class="navbar-item" routerLink="CarRegister">Add car!</a>
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
  title = "Crsx";
  constructor(public loginService: LoginService,
              private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get('http://localhost:8080/pageTitles/1', {responseType: 'text'})
    // .pipe(
    //   catchError((err)=> {
    //     console.log(err);
    //     return of('404 not Found');
    //   })
    // ).subscribe(pageTitle => this.title = pageTitle);
  }
  public loggedIn(){
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loginService.loggedInUser;
  }
  public Logout(){
    var res = confirm("Do you really want to logout?");
    if(res){
      this.loggedInUser = null;
      this.loginService.loggedInUser = null;
      localStorage.removeItem('userName')
      localStorage.removeItem('password')
    }
  }
  
}

