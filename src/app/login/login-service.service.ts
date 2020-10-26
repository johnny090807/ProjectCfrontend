import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {User} from './user.model';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loggedInUser: User;
  Users : Array<User>= [
    {id: 0, firstName: "John", lastName: "Klees", userName:"admin", password:"geheim", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
    {id: 1, firstName: "Rey", lastName: "Leon", userName:"test", password:"test1", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
    {id: 2, firstName: "David", lastName: "Neres", userName:"test", password:"test2", address: "ergens DC.213", email: "Email@gmail.com", admin:false},
  ]
  constructor(private http: HttpClient) { }

  checkLogin(username, password){
    this.http.get('localhost:9090/')
      .subscribe((res: Response) => {
        console.log(res)
        res.json()
    },
    error => console.error("Something went wrong. Error: " + error.throwError()))
    for(let user of this.Users){
      if(user.userName == username){
        if(user.password == password){
          this.loggedInUser = user;
          return true;
        }else{
          return false;
        }
      }
    }
  }
  
  addUser(User: User){
    // const indexer = this.Users.length;
    // User.id = indexer;
    // this.Users.push(User);
    return this.http.post('localhost:9090', User)
    .subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }
}
