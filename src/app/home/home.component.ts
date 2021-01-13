import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Car rental service X
          </h1>
          <h2 class="subtitle">
          The best way to rent a car
          </h2>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background-image: url('/assets/img/pexels-jan-karan-4777372.jpg') !important;
      background-size: cover;
      background-position: center center;
    }

  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
