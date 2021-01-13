import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserReservation } from './adminReservation.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../login/user.model';
import { LoginService } from '../login/login-service.service';
import { Router } from '@angular/router';
import { CarClass } from '../admin-cars/adminCar.model';
import { CarService } from '../rent/car.service';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.scss']
})
export class AdminReservationsComponent implements OnInit {
  public reservations: Array<UserReservation>;
  public reservation: UserReservation;
  public selection: boolean;
  image: SafeUrl;
  public cars: Array<CarClass>;
  public car: CarClass;
  public users: Array<User>;
  public user: User;
  public newAdmin: boolean;
  public registerForm: FormGroup;
  constructor(
    private http: HttpClient,
    private adminUsersService: AdminUsersService,
    private router: Router,
    private carService: CarService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.users = this.adminUsersService.returnUsers();
    this.cars = []
    this.reservations = [];
    this.newAdmin = false;
    this.selection = false;
  }


  //RESERVATIONS

  noReservation() {
    this.selection = false;
    this.reservations = [];
  }


  getReservations() {
    this.noReservation();
    this.getUsers();
    this.getCars();
    setTimeout(() => {
      let IpLink = localStorage.getItem('serverIp');
      this.http.get(IpLink + '/api/getReservations', { responseType: 'json' })
        .subscribe((response) => {
          for (let i = 0; i < Object.keys(response).length; i++) {
            this.reservation = response[i];
            this.reservations.push(this.reservation);
          }
          this.selection = false;
        });
    }, 500);
    console.log(this.reservations);
  }

  getReservationById() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.reservations.push(JSON.parse(response));
        this.reservations[0].startDate = new Date(this.reservations[0].startDate);
        this.reservations[0].endDate = new Date(this.reservations[0].endDate);
        this.selection = true;
      });
  }

  getReservationByUserID() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("userId")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationByUserId?id=' + id, { responseType: 'json' })
      .subscribe((response) => {
        this.reservations.push(response[0]);
        this.reservations[0].startDate = new Date(this.reservations[0].startDate);
        this.reservations[0].endDate = new Date(this.reservations[0].endDate);
        this.selection = true;
      });
    this.reservations.forEach(r => {
      console.log(r);

    });
  }

  getReservationByCarID() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("carId")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationByCarId?id=' + id, { responseType: 'json' })
      .subscribe((response) => {
        this.reservations.push(response[0]);
        this.reservations[0].startDate = new Date(this.reservations[0].startDate);
        this.reservations[0].endDate = new Date(this.reservations[0].endDate);
        this.selection = true;
      });
  }

  deleteReservation() {
    let id = (<HTMLInputElement>document.getElementById("id")).value;
    let IpLink = localStorage.getItem('serverIp');
    if (confirm("Are you sure you want to delete this reservation?")) {
      this.http.delete(IpLink + '/api/deleteReservation?id=' + id, { responseType: 'text' })
        .subscribe((response) => {
          this.reservations = [];
          this.selection = false;
          window.alert("Reservation Deleted!");
        });
    }
  }

  saveReservation() {
    let reservationId = Number((<HTMLInputElement>document.getElementById("reservationId")).value);
    let userId = Number((<HTMLInputElement>document.getElementById("reservationCarId")).value);
    let carId = Number((<HTMLInputElement>document.getElementById("reservationCarId")).value);
    let Bestuurders = Number((<HTMLInputElement>document.getElementById("reservationBestuurders")).value);
    let Price = Number((<HTMLInputElement>document.getElementById("reservationPrice")).value);
    let Kinderstoel = Boolean((<HTMLInputElement>document.getElementById("reservationKinderstoel")).value);
    let Navigatie = Boolean((<HTMLInputElement>document.getElementById("reservationNavigatie")).value);
    let Volgetankt = Boolean((<HTMLInputElement>document.getElementById("reservationVolgetankt")).value);
    let startDate = new Date((<HTMLInputElement>document.getElementById("reservationStartDate")).value);
    let endDate = new Date((<HTMLInputElement>document.getElementById("reservationEndDate")).value);
    let Dropoff = (<HTMLInputElement>document.getElementById("reservationDropoff")).value;

    let reservation = new UserReservation(reservationId, userId, carId, Bestuurders, Price, Kinderstoel, Navigatie, Volgetankt, startDate, endDate, Dropoff);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(reservation);

    let IpLink = localStorage.getItem('serverIp');

    if (confirm("Are you sure you?")) {
      this.http.put(IpLink + '/api/updateReservation?id=' + reservationId, body, { headers, responseType: 'text' })
        .subscribe((response) => {
          window.alert("Changes Saved!");
        });
    }
  }


  //USERS

  noUser() {
    this.selection = false;
    this.users = [];
  }

  createNewAdmin() {
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

  getUser(id) {
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getUserById?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.users = [];
        this.users.push(JSON.parse(response));
        this.user = JSON.parse(response);
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
        });
      });

      this.users = newUsers;

    }, 1000);
  }





  //CARS

  noCar() {
    this.selection = false;
    this.cars = [];
  }

  getCars() {
    this.noCar();
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
