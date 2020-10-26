import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class ="navbar is-dark is-bold">
      <!-- Logo -->
      <div class = "navbar-brand">
       <a class = "navbar-item" routerLink="Home">
        CrsX
       </a>
       </div>

          <!-- menu -->
      <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" routerLink="Home">Home</a>
        <a class="navbar-item" routerLink="Contact">Contact</a>
        <a class="navbar-item" routerLink="Rent">Rent</a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" routerLink="Login">Login</a>
        <a class="navbar-item" routerLink="Register">Register</a>
      </div>
      </div>
</nav>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
