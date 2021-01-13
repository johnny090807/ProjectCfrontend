import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserReservation } from './adminReservation.model';
import { ignoreElements, catchError, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.scss']
})
export class AdminReservationsComponent implements OnInit {
  public reservations: Array<UserReservation>;
  public reservation: UserReservation;
  public selection: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.reservations = [];
    this.selection = false;
  }

  noReservation() {
    this.selection = false;
    this.reservations = [];
  }

  noCar() {
    this.selection = false;
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
    console.log(this.reservations);
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
    let id = (<HTMLInputElement>document.getElementById("userId")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationByUserId?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.reservations.push(JSON.parse(response));
        this.selection = true;
      });
  }

  getReservationByCarID() {
    this.noReservation();
    let id = (<HTMLInputElement>document.getElementById("carId")).value;
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getReservationByCarId?id=' + id, { responseType: 'text' })
      .subscribe((response) => {
        this.reservations.push(JSON.parse(response));
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
          this.reservations.push(JSON.parse(response));
          this.selection = true;
          window.alert("Car Deleted!");
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
}
