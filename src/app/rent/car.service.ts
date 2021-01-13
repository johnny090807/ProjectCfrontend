import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public cars: Array<Car> = []
  public images = [];
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {
    this.getAllCars();
    this.storeImages()
  }

  public returnCars() {
    return this.cars;
  }

  async getAllCars() {
    let IpLink = localStorage.getItem('serverIp');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get(IpLink + '/api/getCars', { headers, responseType: 'json' })
      .subscribe((res: Array<Car>) => {
        this.cars = res;
      },
        error => console.log(error))
    // return returnthing
  }
  public storeImages() {
    let headers = new HttpHeaders({
      'Content-Type': 'image/png',
      'Accept': 'image/png'
    });
    let IpLink = localStorage.getItem('serverIp');
    console.log()
    this.cars.forEach(car => {
      this.http.get(IpLink + '/api/getImageByPath?path=' + car.imagePath + '', { headers, observe: 'response', responseType: 'text' })
        .subscribe((response) => {
          let objectURL = 'data:image/png;base64,' + response.body;
          car.imageUrl = objectURL
        },
          error => console.log(error))
    });
  }
}
