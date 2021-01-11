import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public cars:Array<Car>= []
  public images = [];
  // public cars:Array<Car>= [
  //   {id: 1, brand: "Manual", model: "BMW", price: 30, location: "Den Haag", doors: 3,  imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 2, brand: "Automatic", model: "Dikke BMW", price: 60, location: "Voorburg", doors: 3,  imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 3, brand: "Automatic", model: "Dikke BMW", price: 50, location: "Rotterdam", doors: 3, imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 4, brand: "Automatic", model: "BMW", price: 80, location: "Hellevoetsluis", doors: 3,  imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 5, brand: "Manual", model: "BMW", price: 25, location: "Utrecht",  doors: 3, imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 6, brand: "Manual", model: "Dikke BMW", price: 35, location: "Rozenburg", doors: 3, imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 7, brand: "Manual", model: "Dikke BMW", price: 40, location: "Wateringen", doors: 3, imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015},
  //   {id: 8, brand: "Automatic", model: "BMW", price: 50, location: "Voorburg", doors: 3,  imageUrl: "../../assets/car2.png", mileage: 102300, carAge: 2015}
  // ]
  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
    this.getAllCars();
    this.storeImages()
   }

  public returnCars(){
    return this.cars;
  }

  async getAllCars(){
    let IpLink = localStorage.getItem('serverIp');
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.get(IpLink + '/api/getCars', {headers, responseType: 'json'})
    .subscribe((res: Array<Car>) => {
      this.cars = res
    },
    error=> console.log(error))
    
  }
  public storeImages(){
    let headers = new HttpHeaders({'Content-Type': 'image/png',
    'Accept' : 'image/png'});
    let IpLink = localStorage.getItem('serverIp');
    console.log()
    this.cars.forEach(car => {
      this.http.get(IpLink + '/api/getImageByPath?path='+car.imagePath+'', {headers, observe : 'response', responseType: 'text'})
      .subscribe((response) => {
      let objectURL = 'data:image/png;base64,' + response.body;
      car.imageUrl = objectURL
      },
      error => console.log(error))
    });
  }
}
