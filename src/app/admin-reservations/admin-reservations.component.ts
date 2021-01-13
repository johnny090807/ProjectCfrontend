import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarClass } from './adminCar.model';
import { UserReservation } from './adminReservation.model';
import { CarService } from '../rent/car.service';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../login/user.model';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.scss']
})
export class AdminReservationsComponent implements OnInit {
  image: SafeUrl;
  public reservations: Array<UserReservation>;
  public reservation: UserReservation;
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
    this.reservations = [];
    this.selection = false;
  }

  noReservation() {
    this.selection = false;
    this.reservations = [];
  }

  noCar() {
    this.selection = false;
    this.cars = [];
  }


  getReservations() {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservations', { responseType: 'json' })
      .subscribe((response) => {
        for (let i = 0; i < Object.keys(response).length; i++) {
          this.reservation = response[i];
          this.reservations.push(this.reservation);
        }
        this.selection = false;
      });
  }

  getReservationById() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.reservations.push(JSON.parse(response));
        this.selection = true;
      });
  }

  getReservationByUserID() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.reservations.push(JSON.parse(response));
        this.selection = true;
      });
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
      });
  }

  getCar() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getCarById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.cars = [];
        this.cars.push(JSON.parse(response));
        this.selection = true;
      });

  }

  deleteCar() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    if (confirm("Are you sure you want to delete this car?")) {
      this.http.delete(IpLink + '/api/deleteCar?id=' + id, { responseType: 'text' })
        .subscribe((response) => {
          this.cars = [];
          this.cars.push(JSON.parse(response));
          this.selection = true;
          window.alert("Car Deleted!");
        });
    }
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

    if (confirm("Are you sure you?")) {
      this.http.put(IpLink + '/api/updateCar?id=' + carId, body, { headers, responseType: 'text' })
        .subscribe((response) => {
          window.alert("Changes Saved!");
        });
    }
  }

  searchCars() {
    this.getCars();
    setTimeout(() => {
      let keywords = (<HTMLInputElement>document.getElementById("search")).value.split(" ");
      let newCars = [];

      this.cars.forEach(car => {
        keywords.forEach(keyword => {
          if (car.brand.toLowerCase().includes(keyword.toLowerCase())) {
            newCars.push(car);
          }
          else if (car.model.toLowerCase().includes(keyword.toLowerCase())) {
            newCars.push(car);
          }
          else if (car.location.toLowerCase().includes(keyword.toLowerCase())) {
            newCars.push(car);
          }
        });
      });

      this.cars = newCars;

    }, 1000);


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
        let objectURL = 'data:image/png;base64,' + response.body;
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
        error => console.log(error))
  }
}
