import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  form: FormGroup
  car: Car;
  loggedInUser: User;
  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    let route = this.activatedRoute.snapshot.params['id']
    this.car = this.carService.cars[route - 1];
    this.loggedInUser == this.loginService.loggedInUser;
    this.form = this.fb.group({
      dateRange : new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      }),
    });
  }
  LoggedIn(){
    this.loggedInUser = this.loginService.loggedInUser;
    return this.loggedInUser
  }

  onSubmit(){
    let startDate = this.form.value['dateRange']['startDate'];
    let endDate = this.form.value['dateRange']['endDate'];
    let DaysArray = this.getDaysArray(startDate, endDate)
    console.log(DaysArray)
    // if(DaysArray )
  }
  getDaysArray = function(startDate, endDate) {​​
    for(var arr=[],dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)){​​
        arr.push(new Date(dt));
    }​​
    return arr;
  }​​;
  unavailableDays(calenderDate: Date): boolean{
    // return false;
    const testDates : Date[] = [
      new Date('2021-01-09'),
      new Date('2021-01-10'),
      new Date('2021-01-11'),
      new Date('2021-01-12'),
      new Date('2021-01-13'),
      new Date('2021-01-14')
    ]

    let FalseStatement = testDates.findIndex(testDate => calenderDate.toDateString() == testDate.toDateString()) >= 0;
    return !FalseStatement && calenderDate > new Date();
    // return calenderDate > new Date() && calenderDate.toDateString() != new Date('2021-01-09T00:00:00').toDateString();
    // return calenderDate > new Date();
  }
}
