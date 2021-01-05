import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarClass } from './adminCar.model';
import { CarService } from '../rent/car.service';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.scss']
})

export class AdminCarsComponent implements OnInit {
  image: SafeUrl;
  public cars: Array<CarClass>;
  public car: CarClass;
  public selection: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private carService: CarService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    this.cars = [];
    this.selection = false;
  }

  noCar() {
    this.selection = false;
    this.cars = [];
  }

  getCars() {
    this.cars = [];
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getCars', { responseType: 'json' })
      .subscribe((response) => {
        for (let i = 0; i < Object.keys(response).length; i++) {
          this.car = response[i];
          this.cars.push(this.car);
        }
        this.selection = false;
        console.log(this.cars);
      });
  }

  getCar() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getCarById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.cars = [];
        console.log(response);
        this.cars.push(JSON.parse(response));
        console.log(this.cars);
        this.selection = true;
      });
  }


  saveCar() {

    let carId = Number((<HTMLInputElement>document.getElementById("carId")).value);
    let carBrand = (<HTMLInputElement>document.getElementById("carBrand")).value;
    let carModel = (<HTMLInputElement>document.getElementById("carModel")).value;
    let carLocation = (<HTMLInputElement>document.getElementById("carLocation")).value;
    let carAge = Number((<HTMLInputElement>document.getElementById("carAge")).value);
    let carMileage = Number((<HTMLInputElement>document.getElementById("carMileage")).value);
    let carDoors = Number((<HTMLInputElement>document.getElementById("carDoors")).value);
    let carImage = (<HTMLInputElement>document.getElementById("carImage")).value;

    let car = new CarClass(carId, carBrand, carModel, carLocation, carAge, carMileage, carDoors, carImage);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(car);

    let IpLink = localStorage.getItem('serverIp');
    this.http.put(IpLink + '/api/updateCar?id=' + carId, body, { headers, responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getImage() {
    let img = (<HTMLInputElement>document.getElementById("carImage")).value;
    let headers = new HttpHeaders({
      'Content-Type': 'image/png',
      'Accept': 'image/png'
    });
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getImageByPath?path=' + img, { headers, observe: 'response', responseType: 'text' })
      .subscribe((response) => {
        console.log(response)
        console.log(response.headers.get('Content-Type'))
        let objectURL = 'data:image/png;base64,' + response.body;
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
        error => console.log(error))
  }
}
