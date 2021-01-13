import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public reservations = [];
  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) { }

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

}
