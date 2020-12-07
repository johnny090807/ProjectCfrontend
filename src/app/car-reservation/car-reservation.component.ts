import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../rent/car.model';
import { CarService } from '../rent/car.service';

@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.scss']
})
export class CarReservationComponent implements OnInit {
  car: Car;
  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let route = this.activatedRoute.snapshot.params['id']
    this.car = this.carService.cars[route - 1];
  }

}
