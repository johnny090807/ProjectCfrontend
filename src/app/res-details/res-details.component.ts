import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';
import { Car } from '../rent/car.model';
import { CarService } from '../rent/car.service';

@Component({
  selector: 'app-res-details',
  templateUrl: './res-details.component.html',
  styleUrls: ['./res-details.component.scss']
})
export class ResDetailsComponent implements OnInit {
  form: FormGroup;
  car: Car;
  loggedInUser: User;
  price: number;
  bestuurders: number;
  datum: Date

  Reservations = [];
  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private fb: FormBuilder,
              private http: HttpClient) {
              }

  ngOnInit(): void {
    let route = this.activatedRoute.snapshot.params['id']
    this.car = this.carService.cars[route - 1];
    this.loggedInUser == this.loginService.loggedInUser;
    this.price = this.car.price;
    this.form = this.fb.group({
      Bestuurders: [new FormControl(), Validators.required],
      Kinderstoel: new FormControl(),
      Volgetankt: new FormControl(),
      Navigatie: new FormControl(),
      dateRange : new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      }),
    });
    this.getAllReservedDates()
  }
  LoggedIn(){
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loggedInUser
  }

  onSubmit(){
    this.loggedInUser = this.loginService.loggedInUser;
    let Bestuurders = this.form.value.Bestuurders
    if(Bestuurders == null){
      Bestuurders = 1
    }else{
      Bestuurders += 1
    }
    let Kinderstoel = this.form.value.Kinderstoel
    let Volgetankt = this.form.value.Volgetankt
    let Navigatie = this.form.value.Navigatie
    let startDate = this.form.value['dateRange']['startDate'];
    let endDate = this.form.value['dateRange']['endDate'];
    let DaysArray = this.getDaysArray(startDate, endDate)
    let DaysNumber = this.getDaysNumber(startDate,endDate)
    let reservationArray = {
      "userId": this.loggedInUser.id,
      "carId": this.car.id,
      "bestuurders": Bestuurders,
      "price": this.price,
      "kinderstoel": Kinderstoel,
      "navigatie": Navigatie,
      "volgetankt": Volgetankt,
      "startDate": startDate,
      "endDate": endDate,
    }
    let checkDate: Date[] = this.getDaysArray(startDate,endDate)
    for(let date in checkDate){
      for(let date2 in this.ReservationDates){
        if(checkDate[date].getDate() == this.ReservationDates[date2].getDate()){
          // console.log(checkDate[date], this.ReservationDates[date2])
          alert("This date is already taken. Click the reserved dates to see the reserved dates")
          return
        }
      }
    }
    if(endDate == null){
      alert("You need to fill in a date.")
    }else{
      let IpLink = localStorage.getItem('serverIp');
      let body = JSON.stringify(reservationArray);
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post(IpLink + '/api/addReservation/', body, {headers, responseType: 'text'})
      .subscribe(res => alert("Thank you for the reservation!"),
      error => console.error(error))
    }
  }
  getDaysArray = function(startDate, endDate) {​​
    for(var arr=[],dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)){​​
        arr.push(new Date(dt));
    }​​
    return arr;
  }​​;
  getDaysNumber = function(startDate, endDate) {​​
    for(var arr=0,dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)){​​
        arr++;
    }​​
    return arr;
  }​​;
  getAllReservedDates(){
    let IpLink = localStorage.getItem('serverIp');
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.get(IpLink + '/api/getReservationByCarId?id=' + this.car.id, {headers, responseType: 'json'})
    .subscribe((res: Array<Object>) => {
      this.Reservations = res;
      
      this.makeAllReservedDates()
    },
    error => console.log(error))
  };

  makeAllReservedDates(){
    let arr = this.Reservations;
    let newArr = []
    for(let date in arr){
      let allDates = this.getDaysArray(arr[date]['startDate'], arr[date]['endDate'])
      for(let date in allDates){
        newArr.push(allDates[date])
      }
    }
    this.ReservationDates = newArr
  }
  ReservationDates : Date[] = [];
  unavailableDays(calenderDate: Date): boolean{
    let FalseStatement = this.ReservationDates.findIndex(testDate => calenderDate.toDateString() == testDate.toDateString()) >= 0;
    return !FalseStatement && calenderDate > new Date();
    // return calenderDate > new Date() && calenderDate.toDateString() != new Date('2021-01-09T00:00:00').toDateString();
    // return calenderDate > new Date();
  }
  unavailableDaysBeforeOwnDate(calenderDate: Date): boolean{
    return calenderDate > new Date();
  }

  onChange(): void{
    
    this.price = this.car.price * this.getDaysNumber(this.form.value.dateRange.startDate, this.form.value.dateRange.endDate)
    this.datum = null
    if(this.form.value.Bestuurders != null){
      this.price += this.form.value.Bestuurders * 20
    }
    if(this.form.value.Kinderstoel){
      this.price += 20
   }
    if(this.form.value.Navigatie){
      this.price += 12.50
    }
    if(this.form.value.Volgetankt){
      this.price += 90
    }
  }
}
