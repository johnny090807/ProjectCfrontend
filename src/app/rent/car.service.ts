import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public cars:Array<Car>= [
    {id: 1, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Den Haag", imageUrl: "../../assets/car2.png"},
    {id: 2, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Voorburg", imageUrl: "../../assets/car2.png"},
    {id: 3, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Rotterdam", imageUrl: "../../assets/car2.png"},
    {id: 4, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Hellevoetsluis", imageUrl: "../../assets/car2.png"},
    {id: 5, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Utrecht", imageUrl: "../../assets/car2.png"},
    {id: 6, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Rozenburg", imageUrl: "../../assets/car2.png"},
    {id: 7, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Wateringen", imageUrl: "../../assets/car2.png"},
    {id: 8, type: "Manual", name: "BMW", price: 50, review: 8.3, address: "Voorburg", imageUrl: "../../assets/car2.png"}
  ]
  constructor(private http: HttpClient) { }

  public returnCars(){
    return this.cars;
  }

  public getAllCars(){
    let IpLink = localStorage.getItem('serverIp');
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(IpLink + '/api/getCars', {headers, responseType: 'json'})
  }
}
