import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../login/user.model';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.scss']
})

export class AdminCarsComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router) {

  }


  ngOnInit(): void {
  }


  getCars() {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getCars', { responseType: 'json' })
      .subscribe((response) => {

        var cars = response;
        // user = new User(
        //   response['firstName'],
        //   response['lastName'],
        //   response['userName'],
        //   response['password'],
        //   response['address'],
        //   response['email'],
        //   response['id']
        console.log(cars);
      });
  }

}
