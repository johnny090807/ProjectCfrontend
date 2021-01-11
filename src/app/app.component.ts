import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { LoginService } from './login/login-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarService } from './rent/car.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup
  image: SafeUrl;
  constructor(private http: HttpClient,
              private loginService: LoginService,
              private sanitizer: DomSanitizer,
              private carService: CarService){
                localStorage.setItem('serverIp', 'http://localhost:8080')
                this.getImage()
                this.loginService.loggedIn()
                this.carService.getAllCars()
              }
   getImage(){
    let headers = new HttpHeaders({'Content-Type': 'image/png',
                                  'Accept' : 'image/png'});
    let IpLink = localStorage.getItem('serverIp');
    this.http.get(IpLink + '/api/getImageByPath?path=car2.png', {headers, observe : 'response', responseType: 'text'})
    .subscribe((response) => {
      // console.log(response)
      // console.log(response.headers.get('Content-Type'))
      // this.sanitize(response)
      // btoa(response)
      // let objectURL = URL.createObjectURL(response);       
      // this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // const reader = new FileReader();
      // reader.onload = (e) => this.image = e.target.result;
      // reader.readAsDataURL(new Blob([response]));
      // reader.onload = (_event) => {
      //   this.image = reader.result;
      //  }
      let objectURL = 'data:image/png;base64,' + response.body;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    },
    error => console.log(error))
  }
  // _arrayBufferToBase64( buffer ) {
  //   var binary = '';
  //   var bytes = new Uint8Array( buffer );
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //      binary += String.fromCharCode( bytes[ i ] );
  //   }
  //   return window.btoa( binary );
  // }
  sanitize( url ){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
}
