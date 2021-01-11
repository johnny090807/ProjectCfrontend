import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { promise } from 'protractor';
import { Car } from './car.model';
import { CarService } from './car.service';
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  public cars: Array<Car>;
  public locations = [];
  public checkedLocations = [];
  public carsFilteredOnLocation = [];
  public brands = [];
  public checkedBrands = [];
  public carsFilteredOnBrand = [];
  public gearboxes = [];
  public checkedGearboxes = [];
  public carsFilteredOnGearbox = [];
  public prices = [];
  public carsFilteredOnPrice = [];
  public oldCars = [];
  public images = [];
  constructor(private carService: CarService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
    Promise.resolve().then(_ => this.carService.getAllCars())
    setTimeout(_ => {
      this.cars = this.carService.returnCars();
      this.carService.storeImages()
      this.images = this.carService.images;
      this.oldCars = this.cars;
      this.carsFilteredOnLocation = this.cars;
      this.carsFilteredOnBrand = this.cars;
      this.carsFilteredOnGearbox = this.cars;
      this.carsFilteredOnPrice = this.cars
      for (let car of this.cars) {
        this.locations.push(car.location);
        this.brands.push(car.brand);
        this.gearboxes.push(car.model);
        this.prices.push(car.price);
      }
    }, 200)
   
  }
  filterCars() {
    this.cars = this.oldCars.filter(c => this.carsFilteredOnLocation.includes(c));
    this.cars = this.cars.filter(c => this.carsFilteredOnBrand.includes(c));
    this.cars = this.cars.filter(c => this.carsFilteredOnGearbox.includes(c));
    this.cars = this.cars.filter(c => this.carsFilteredOnPrice.includes(c));
  }
  
  sanitize( url ){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
  uncheckall() { //unUsed right now
    this.cars = this.oldCars;
  }

  addCarsOnLocation() {
    this.carsFilteredOnLocation = [];
    for (let location of this.checkedLocations) {
      for (let car of this.oldCars) {
        if (location === car.location) {
          this.carsFilteredOnLocation.push(car);
        }
      }
    }
    if (this.checkedLocations.length == 0) {
      this.carsFilteredOnLocation = this.oldCars;
    }
    this.filterCars();

  }

  filterCarsOnLocation(checkedBox) {
    let check = false;
    let i = 0;
    for (let location of this.checkedLocations) {
      if (checkedBox === location) {
        check = true;
        this.checkedLocations.splice(i, 1);
      }
      i++;
    }
    if (check === false) {
      this.checkedLocations.push(checkedBox);
    }
    this.addCarsOnLocation();
  }

  addCarsOnBrand() {
    this.carsFilteredOnBrand = [];
    for (let brand of this.checkedBrands) {
      for (let car of this.oldCars) {
        if (brand === car.brand) {
          this.carsFilteredOnBrand.push(car);
        }
      }
    }
    if (this.checkedBrands.length == 0) {
      this.carsFilteredOnBrand = this.oldCars;
    }
    this.filterCars();
  }

  filterCarsOnBrand(checkedBox) {
    let check = false;
    let i = 0;
    for (let brand of this.checkedBrands) {
      if (checkedBox === brand) {
        check = true;
        this.checkedBrands.splice(i, 1);
      }
      i++;
    }
    if (check === false) {
      this.checkedBrands.push(checkedBox);
    }
    this.addCarsOnBrand();
  }

  addCarsOnGearbox() {
    this.carsFilteredOnGearbox = [];
    for (let gearbox of this.checkedGearboxes) {
      for (let car of this.oldCars) {
        if (gearbox === car.model) {
          this.carsFilteredOnGearbox.push(car);
        }
      }
    }
    if (this.checkedGearboxes.length == 0) {
      this.carsFilteredOnGearbox = this.oldCars;
    }
    this.filterCars();
  }

  filterCarsOnGearbox(checkedBox) {
    let check = false;
    let i = 0;
    for (let gearbox of this.checkedGearboxes) {
      if (checkedBox === gearbox) {
        check = true;
        this.checkedGearboxes.splice(i, 1);
      }
      i++;
    }
    if (check === false) {
      this.checkedGearboxes.push(checkedBox);
    }
    this.addCarsOnGearbox();
  }

  addCarsOnPrice(min, max) {
    this.carsFilteredOnPrice = [];
    for (let car of this.oldCars) {
      if (min <= car.price && max >= car.price) {
        this.carsFilteredOnPrice.push(car);
      }
    }

    if (!min && !max) {
      this.carsFilteredOnPrice = this.oldCars;
    }
    this.filterCars();
  }

  filterCarsOnPrice() {
    let min = document.querySelector<HTMLInputElement>("#minPrice");
    let max = document.querySelector<HTMLInputElement>("#maxPrice");
    this.addCarsOnPrice(min.value, max.value);
  }

  clearPrice() {
    this.addCarsOnPrice(null, null);
  }

}
