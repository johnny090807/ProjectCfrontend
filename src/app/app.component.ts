import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "CrsX test"

  constructor(private http: HttpClient){
    http.get(`http://localhost:8080/pageTitles/1`, {responseType: 'text'})
    .pipe(
      catchError((err)=> {
        console.log(err);
        return of('404 not Found');
      })
    ).subscribe(pageTitle => this.title = pageTitle);
  }
}
