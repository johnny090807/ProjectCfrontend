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
  public brands = [];
  public checkedBrands = [];
  public gearboxes = [];
  public checkedGearboxes = [];
  public oldCars = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.returnCars();
    this.oldCars = this.cars;
    for(let car of this.cars){
      this.locations.push(car.address);
      this.brands.push(car.name);
      this.gearboxes.push(car.type);
    }
  }

  uncheckall(){
    this.cars = this.oldCars;
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
      this.cars = [];
      for(let brand of this.checkedBrands){
        for(let car of this.oldCars){
          if(brand === car.name){
            this.cars.push(car);
          }
        }
      }
      if (this.checkedBrands.length == 0){
        this.cars = this.oldCars;
      }

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
      this.cars = [];
      for(let gearbox of this.checkedGearboxes){
        for(let car of this.oldCars){
          if(gearbox === car.type){
            this.cars.push(car);
          }
        }
      }
      if (this.checkedGearboxes.length == 0){
        this.cars = this.oldCars;
      }

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
