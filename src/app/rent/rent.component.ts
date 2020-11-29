import { Component, OnInit } from '@angular/core';
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
  public carsFilteredOnLocation = [];
  public brands = [];
  public checkedBrands = [];
  public carsFilteredOnBrand = [];
  public gearboxes = [];
  public checkedGearboxes = [];
  public carsFilteredOnGearbox = [];
  public oldCars = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.returnCars();
    this.oldCars = this.cars;
    this.carsFilteredOnLocation = this.cars;
    this.carsFilteredOnBrand = this.cars;
    this.carsFilteredOnGearbox = this.cars;
    for(let car of this.cars){
      this.locations.push(car.address);
      this.brands.push(car.name);
      this.gearboxes.push(car.type);
    }
  }

  filterCars() {
    this.cars = this.oldCars.filter(c => this.carsFilteredOnLocation.includes(c));
    this.cars = this.cars.filter(c => this.carsFilteredOnBrand.includes(c));
    this.cars = this.cars.filter(c => this.carsFilteredOnGearbox.includes(c));
  }

  uncheckall(){ //unUsed right now
    this.cars = this.oldCars;
  }

  addCarsOnLocation(){
    this.carsFilteredOnLocation = [];
    for(let location of this.checkedLocations){
      for(let car of this.oldCars){
        if(location === car.address){
          this.carsFilteredOnLocation.push(car);
        }
      }
    }
    if (this.checkedLocations.length == 0){
      this.carsFilteredOnLocation = this.oldCars;
    }
    this.filterCars();

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

  addCarsOnBrand(){
      this.carsFilteredOnBrand = [];
      for(let brand of this.checkedBrands){
        for(let car of this.oldCars){
          if(brand === car.name){
            this.carsFilteredOnBrand.push(car);
          }
        }
      }
      if (this.checkedBrands.length == 0){
        this.carsFilteredOnBrand = this.oldCars;
      }
      this.filterCars();
    }

  filterCarsOnBrand(checkedBox){
    let check = false;
    let i = 0;
    for(let brand of this.checkedBrands){
      if(checkedBox === brand){
        check = true;
        this.checkedBrands.splice(i, 1);
      }
      i++;
    }
    if (check === false){
      this.checkedBrands.push(checkedBox);
    }
    this.addCarsOnBrand();
  }

  addCarsOnGearbox(){
      this.carsFilteredOnGearbox = [];
      for(let gearbox of this.checkedGearboxes){
        for(let car of this.oldCars){
          if(gearbox === car.type){
            this.carsFilteredOnGearbox.push(car);
          }
        }
      }
      if (this.checkedGearboxes.length == 0){
        this.carsFilteredOnGearbox = this.oldCars;
      }
      this.filterCars();
    }

  filterCarsOnGearbox(checkedBox){
    let check = false;
    let i = 0;
    for(let gearbox of this.checkedGearboxes){
      if(checkedBox === gearbox){
        check = true;
        this.checkedGearboxes.splice(i, 1);
      }
      i++;
    }
    if (check === false){
      this.checkedGearboxes.push(checkedBox);
    }
    this.addCarsOnGearbox();
  }

}
