import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';
import { Car } from '../rent/car.model';
import { CarService } from '../rent/car.service';

@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.scss']
})
export class CarReservationComponent implements OnInit {
  form: FormGroup
  car: Car;
  loggedInUser: User;
  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    let route = this.activatedRoute.snapshot.params['id']
    this.carService.cars.forEach(car => {
      if (car.id == route){
        this.car = car
      }
    });
    // this.car = this.carService.cars['id'].find(route);
    this.loggedInUser == this.loginService.loggedInUser;
    this.form = this.fb.group({
      dateRange : new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      }),
    });
  }
  LoggedIn(){
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loggedInUser
  }
}
