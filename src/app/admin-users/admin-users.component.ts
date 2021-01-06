import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../login/user.model';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AdminUsersService } from './admin-users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})

export class AdminUsersComponent implements OnInit {
  public users: Array<User>;
  public user: User;
  public selection: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private adminUsersService: AdminUsersService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    this.users = this.adminUsersService.returnUsers();
    this.selection = false;
  }

  noUser() {
    this.selection = false;
    this.users = [];
  }


  getUsers() {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getUsers', { responseType: 'json' })
      .subscribe((response) => {

        for (let i = 0; i < Object.keys(response).length; i++) {
          this.user = response[i];
          this.users.push(this.user);
        }

      });
  }

  getUser() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getUserById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.users = [];
        console.log(response);
        this.users.push(JSON.parse(response));
        console.log(this.users);
        this.selection = true;
      });
  }

}
