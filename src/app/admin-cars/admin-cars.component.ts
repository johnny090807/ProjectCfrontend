import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarClass } from '../register-car/carClass.model';
import { CarService } from '../rent/car.service';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.scss']
})

export class AdminCarsComponent implements OnInit {
  public cars: Array<CarClass>;
  public car: CarClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private carService: CarService
  ) { }


  ngOnInit(): void {
    this.cars = [];
  }


  getCars() {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getCars', { responseType: 'json' })
      .subscribe((response) => {

        for (let i = 0; i < Object.keys(response).length; i++) {
          this.car = response[i];
          this.cars.push(this.car);
        }

        console.log(this.cars);
      });
  }

}
