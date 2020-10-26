import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService,
              private router: Router) { }

  ngOnInit(): void {

  }
  loggedIn(){
    return this.loginService.loggedInUser;
  }
  logout(){
    this.router.navigate(['/Home']);
    this.loginService.loggedInUser = null;
  }

}
