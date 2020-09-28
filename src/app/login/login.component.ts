import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  errorLabel: string;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(values){
    if (values.username != "" && values.password != ""){
      this.errorLabel = "";
      return this.loginService.checkLogin(values.username, values.password);
    }else{
      this.errorLabel = "The information is not correct."     
    }
  }
}
