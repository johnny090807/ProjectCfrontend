import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarClass } from './carClass.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginService } from '../login/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss']
})
export class RegisterCarComponent implements OnInit {
  public CarRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private LoginService: LoginService,
              private router: Router) { 
                // if (this.LoginService.loggedInUser == null)
                // {
                //   alert('You need to be logged in to view this page.')
                //   this.router.navigate(['/Login']);
                // }
              }

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
    const pic = new FormData();
    pic.append("MyFile", this.selectedFile, this.selectedFile.name);
    let headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    const IpLink = localStorage.getItem('serverIp');
    this.http.post(IpLink + '/api/addImage', pic, {responseType: 'text'})
    .subscribe(res => {
      console.log(res);
      // const carToBeAdded = new CarClass(values.brand,values.model, values.location,values.carAge, values.mileage, values.doors, res['id']);
      // let body = JSON.stringify(carToBeAdded);
      // this.http.post(IpLink + '/api/addCar', body, {headers, responseType: 'text'})
      // .subscribe(message => alert(message),
      // error => alert(error.message))
    }), error => alert(error.message)
  }

  selectedFile = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData;
    fd.append('image', this.selectedFile);
    //change the url to a location where we wanna store the images
    // this.http.post('http://localhost:8080/api/addCar', fd, {
    //   reportProgress: true,
    //   observe: 'events'
    // })
      // .subscribe(event=>{
      //   console.log(event);
      // });
  }
}
