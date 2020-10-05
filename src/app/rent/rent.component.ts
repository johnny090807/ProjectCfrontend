import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Car } from './car.model';
import { CarService } from './car.service';
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  public cars:Array<Car>;
  public locations = [];
  public checkedLocations = [];
  public oldCars = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.returnCars();
    this.oldCars = this.cars;
    for(let car of this.cars){
      this.locations.push(car.address);
    }
  }
  addCarsOnLocation(){
    this.cars = [];
    for(let location of this.checkedLocations){
      for(let car of this.oldCars){
        if(location === car.address){
          this.cars.push(car);
        }
      }
    }
    if (this.checkedLocations.length == 0){
      this.cars = this.oldCars;
    }
    
  }
  uncheckall(){
    this.cars = this.oldCars;
  }
  filterCarsOnLocation(checkedBox){
    let check = false;
    let i = 0;
    for(let location of this.checkedLocations){
      if(checkedBox === location){
        check = true;
        this.checkedLocations.splice(i, 1);
      }
      i++;
    }
    if (check === false){
      this.checkedLocations.push(checkedBox);
    }
    this.addCarsOnLocation();
  }
}
