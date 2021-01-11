import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User;
  title = "Crsx";
  constructor(public loginService: LoginService,
    private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loggedInUser = this.loginService.loggedInUser
    }, 500);
  }
  public loggedIn() {
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loginService.loggedInUser;
  }
  public Logout() {
    var res = confirm("Do you really want to logout?");
    if (res) {
      this.loggedInUser = null;
      this.loginService.loggedInUser = null;
      localStorage.removeItem('userName')
      localStorage.removeItem('password')
    }
  }

}

