import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarClass } from './carClass.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss']
})
export class RegisterCarComponent implements OnInit {
  public CarRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.CarRegisterForm = this.formBuilder.group({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      carAge: new FormControl('', [Validators.required]),
      mileage: new FormControl('', [Validators.required]),
      doors: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }
  
  onSubmit(values){
    const carToBeAdded = new CarClass(values.brand,values.model, values.location,values.carAge, values.mileage, values.doors);
    let body = JSON.stringify(carToBeAdded);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post('http://localhost:8080/api/addCar', body, {headers, responseType: 'text'})
    .subscribe(message => alert(message),
    error => alert(error.message))
  }
}
