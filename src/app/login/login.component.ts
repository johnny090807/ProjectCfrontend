import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../rent/car.service';
import { LoginService } from './login-service.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  errorLabel: string;
  validateLabel: string;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private carService: CarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    this.carService.getAllCars()
    .subscribe(res => console.log(res),
              error => console.log(error))
  }

  onSubmit(values){
    if (values.username != "" && values.password != ""){
      this.loginService.checkLogin(values.username, values.password)
    }
  }
}
