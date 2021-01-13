import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login-service.service';
import { User } from '../login/user.model';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public reservations = [];
  constructor(private http: HttpClient,
    private loginService: LoginService,
              private activatedRoute: ActivatedRoute) { }

   NewPW="";
   ConfirmNewpw="";
   popupPW=false;
   loggedInUser : User;

  ngOnInit(): void {
    this.getReservationsByUserId()
    setTimeout(() => {
      console.log(this.reservations)
    }, 250);
  }

  getReservationsByUserId(){
    let IpLink = localStorage.getItem('serverIp');
    let route = this.activatedRoute.snapshot.params['id']
    this.http.get(IpLink + '/api/getReservationByUserId?id=' + route, {responseType: 'json'})
    .subscribe((response: Array<any>) => {
      this.reservations = response;
    })
  }
  test(){
    this.NewPW=this.loggedInUser.password;
  }

  PwchangeConfirm(value1 , Value2){
    if(value1 == Value2){
      this.NewPW= value1;
      console.log(this.NewPW);
      this.loggedInUser.password = this.NewPW;
      this.ChangePassword(this.loggedInUser.id,this.loggedInUser);
    }
  }
  ChangePassword(ID,user:User){
    let IPlink= localStorage.getItem('serverIp');
    let body = JSON.stringify(User);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.patch(IPlink+'/api/updateUser?id='+ID+body,{headers, responseType: 'text'})
      .subscribe(res =>console.log(res) );


  }

}
