import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../login/user.model';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AdminUsersService } from './admin-users.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})

export class AdminUsersComponent implements OnInit {
  constructor(
    //public users: Array<User>,
    private http: HttpClient,
    private router: Router,
    private adminUsersService: AdminUsersService
  ) { }


  ngOnInit(): void {
    //this.users = this.adminUsersService.returnUsers();
  }


  getUsers() {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getUsers', { responseType: 'json' })
      .subscribe((response) => {

        //this.users = response;
        //console.log(users);
      });
  }

}
