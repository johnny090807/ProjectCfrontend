import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './adminUser.model';
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
    this.noUser();
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

  saveUser() {
    let userId = Number((<HTMLInputElement>document.getElementById("userId")).value);
    let userFirstName = (<HTMLInputElement>document.getElementById("userFirstName")).value;
    let userLastName = (<HTMLInputElement>document.getElementById("userLastName")).value;
    let userUserName = (<HTMLInputElement>document.getElementById("userUserName")).value;
    let userPassword = ((<HTMLInputElement>document.getElementById("userPassword")).value);
    let userAddress = ((<HTMLInputElement>document.getElementById("userAddress")).value);
    let userEmail = ((<HTMLInputElement>document.getElementById("userEmail")).value);

    let user = new User(userId, userFirstName, userLastName, userUserName, userPassword, userAddress, userEmail);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(user);

    let IpLink = localStorage.getItem('serverIp');

    if (confirm("Are you sure you?")) {
      this.http.put(IpLink + '/api/updateUser?id=' + userId, body, { headers, responseType: 'text' })
        .subscribe((response) => {
          window.alert("Changes Saved!");
        });
    }
  }

  searchUsers() {
    this.getUsers();
    setTimeout(() => {
      let keywords = (<HTMLInputElement>document.getElementById("search")).value.split(" ");
      let newUsers = [];

      this.users.forEach(user => {
        keywords.forEach(keyword => {
          if (user.firstName.toLowerCase().includes(keyword.toLowerCase())) {
            newUsers.push(user);
          }
          else if (user.lastName.toLowerCase().includes(keyword.toLowerCase())) {
            newUsers.push(user);
          }
          else if (user.address.toLowerCase().includes(keyword.toLowerCase())) {
            newUsers.push(user);
          }
        });
      });

      this.users = newUsers;

    }, 1000);
  }

}
