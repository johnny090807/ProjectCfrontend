import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';

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
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(values){
    if (values.username != "" && values.password != ""){
      this.errorLabel = "";
      this.validateLabel = ""
      if (this.loginService.checkLogin(values.username, values.password)){
        this.validateLabel = "You're logged in!";
        this.router.navigate(['/Home'])
      }else{
        this.errorLabel = "We cannot find your information";
      }
    }else{
      this.errorLabel = "The information is not correct."     
    }
  }
}
