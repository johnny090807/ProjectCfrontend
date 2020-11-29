import { Injectable } from '@angular/core';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public cars:Array<Car>= [
    {id: 1, type: "Manual", name: "BMW", price: 30, review: 8.3, address: "Den Haag", imageUrl: "../../assets/car2.png"},
    {id: 2, type: "Automatic", name: "Dikke BMW", price: 60, review: 8.3, address: "Voorburg", imageUrl: "../../assets/car2.png"},
    {id: 3, type: "Automatic", name: "Dikke BMW", price: 50, review: 8.3, address: "Rotterdam", imageUrl: "../../assets/car2.png"},
    {id: 4, type: "Automatic", name: "BMW", price: 80, review: 8.3, address: "Hellevoetsluis", imageUrl: "../../assets/car2.png"},
    {id: 5, type: "Manual", name: "BMW", price: 25, review: 8.3, address: "Utrecht", imageUrl: "../../assets/car2.png"},
    {id: 6, type: "Manual", name: "Dikke BMW", price: 35, review: 8.3, address: "Rozenburg", imageUrl: "../../assets/car2.png"},
    {id: 7, type: "Manual", name: "Dikke BMW", price: 40, review: 8.3, address: "Wateringen", imageUrl: "../../assets/car2.png"},
    {id: 8, type: "Automatic", name: "BMW", price: 50, review: 8.3, address: "Voorburg", imageUrl: "../../assets/car2.png"}
  ]
  constructor() { }

  public returnCars(){
    return this.cars;
  }
}
