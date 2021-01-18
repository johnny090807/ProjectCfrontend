import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {User} from './user.model';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loggedInUser: User;
  constructor(private http: HttpClient,
              private router: Router) { 
                
              }
  loggedIn(){
    if(localStorage.getItem('userName') == null && localStorage.getItem('password') == null){
      return;
    }
    let IpLink = localStorage.getItem('serverIp');
    var user;
    this.http.get(IpLink + '/api/checkLogin?userName=' + localStorage.getItem('userName') + '&password=' + localStorage.getItem('password'), {responseType: 'json'})
    .subscribe((response) => {
      user = new User(
        response['firstName'],
        response['lastName'],
        response['userName'],
        response['password'],
        response['address'],
        response['email'],
        response['age'],
        response['phonenumber'],
        response['admin'],
        response['id']
      );
      this.loggedInUser = user;
    })
  }
  checkLogin(username, password){
    let IpLink = localStorage.getItem('serverIp');
    var user;
    this.http.get(IpLink + '/api/checkLogin?userName=' + username + '&password=' + password, {responseType: 'json'})
    .subscribe((response) => {
      user = new User(
        response['firstName'],
        response['lastName'],
        response['userName'],
        response['password'],
        response['address'],
        response['email'],
        response['age'],
        response['phonenumber'],
        response['admin'],
        response['id']
      );
      if (user.firstName == null && user.lastName == null && user.address == null && user.email == null && user.username == null && user.password == null){
        alert("This user is not known to us.");
      }else{
        this.loggedInUser = user;
        alert("You're logged in!");
        this.router.navigate(['/Home'])
      }
    }, error => alert("There was an error handling your response: " + error.message))
  }
  addUser(User: User){
    let IpLink = localStorage.getItem('serverIp');
    let body = JSON.stringify(User);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(IpLink + '/api/addUser/', body, {headers, responseType: 'text'})
  }
}
