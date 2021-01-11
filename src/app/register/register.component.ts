import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) { }
              
  ngOnInit(): void {
    this.registerForm =this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      EmailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  onSubmit(values){
    const userToBeAdded = new User(values.firstName, values.lastName,values.userName, values.password, values.Address, values.EmailAddress, values.Age, values.PhoneNumber);
    this.loginService.addUser(userToBeAdded)
    .subscribe((response) => {
      alert(response)
    },
    (error) => {
      alert(error)
    }) 
  }
}
