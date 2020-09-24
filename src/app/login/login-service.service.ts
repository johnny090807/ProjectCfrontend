import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedInUser: User;
  constructor(private http: HttpClient) { }

  checkLogin(username, password){
    this.http.get('localhost:8080/'+ username)
      .subscribe((res: Response) => {
        res.json()
    },
    error => console.error("Something went wrong. Error: " + error.throwError()))
  }
  
  addUser(User: User){
    return this.http.post('localhost:8080', User)
    .subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }
}
