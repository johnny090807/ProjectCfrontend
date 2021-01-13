import { Injectable } from '@angular/core';
import { User } from './adminUser.model';


@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  public Users: Array<User> = [];

  constructor() { }

  public returnUsers() {
    return this.Users;
  }
}
