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
  // Users : Array<User>= [
  //   {id: 0, firstName: "John", lastName: "Klees", userName:"admin", password:"geheim", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
  //   {id: 1, firstName: "Rey", lastName: "Leon", userName:"test", password:"test1", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
  //   {id: 2, firstName: "David", lastName: "Neres", userName:"test", password:"test2", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
  // ]
  constructor(private http: HttpClient,
              private router: Router) { }

  checkLogin(username, password){
    var user;
    this.http.get('http://localhost:8080/api/checkLogin?userName=' + username + '&password=' + password, {responseType: 'json'})
    .subscribe((response) => {
      user = new User(
        response['firstName'],
        response['lastName'],
        response['userName'],
        response['password'],
        response['address'],
        response['email'],
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
    let body = JSON.stringify(User);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/api/addUser/', body, {headers, responseType: 'text'})
  }
}
