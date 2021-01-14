import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login-service.service';
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
  public newAdmin: boolean;
  public registerForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private adminUsersService: AdminUsersService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }


  ngOnInit(): void {
    this.users = this.adminUsersService.returnUsers();
    this.selection = false;
    this.newAdmin = false;
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      EmailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  onSubmit(values) {
    const userToBeAdded = new User(values.firstName, values.lastName, values.userName, values.password, values.Address, values.EmailAddress, values.Age, values.PhoneNumber, true);
    this.loginService.addUser(userToBeAdded)
      .subscribe((response) => {
        alert(response)
      },
        (error) => {
          console.log(error)
        })
  }

  noUser() {
    this.selection = false;
    this.users = [];
  }

  createNewAdmin() {
    this.noUser();
    this.newAdmin = true;
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
        this.user = JSON.parse(response)
        console.log(this.user.id.toString());
        this.users.push(JSON.parse(response));
        this.selection = true;
      });
  }

  saveUser() {

    let userFirstName = (<HTMLInputElement>document.getElementById("userFirstName")).value;
    let userLastName = (<HTMLInputElement>document.getElementById("userLastName")).value;
    let userUserName = (<HTMLInputElement>document.getElementById("userUserName")).value;
    let userPassword = ((<HTMLInputElement>document.getElementById("userPassword")).value);
    let userAddress = ((<HTMLInputElement>document.getElementById("userAddress")).value);
    let userEmail = ((<HTMLInputElement>document.getElementById("userEmail")).value);
    let userAge = new Date((<HTMLInputElement>document.getElementById("userAge")).value);
    let userPhonenumber = ((<HTMLInputElement>document.getElementById("userPhone")).value);
    let userAdmin = Boolean((<HTMLInputElement>document.getElementById("userAdmin")).value);
    let userId = Number((<HTMLInputElement>document.getElementById("userId")).value);

    let user = new User(userFirstName, userLastName, userUserName, userPassword, userAddress, userEmail, userAge, userPhonenumber, userAdmin, userId);
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
          else if (user.userName.toLowerCase().includes(keyword.toLowerCase())) {
            newUsers.push(user);
          }
        });
      });

      this.users = newUsers;

    }, 1000);
  }

  deleteUser() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(IpLink + '/api/deleteUser?id=' + id, { responseType: 'text' })
        .subscribe((response) => {
          this.users = [];
          this.selection = false;
          window.alert("User Deleted!");
        });
    }
  }

}
