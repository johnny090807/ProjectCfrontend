import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <section class="hero is-small is-dark is-bold">
    <div class="hero-body">
    <div class="container has-text-centered">

      <h1 class="title">Contact Us</h1>

    </div>
    </div>
    </section>

    <section class="section has-background-dark">
    <div class="container has-background-dark">

      <!-- form goes here -->
      <form (ngSubmit)="submitForm()">

        <!-- name -->
        <div class="field">
          <input type="text" name="name" class="input" placeholder="Your Name" [(ngModel)]="name">
        </div>

        <!-- email -->
        <div class="field">
          <input type="email" name="email" class="input" placeholder="Your Email" [(ngModel)]="email">
        </div>

        <!-- message -->
        <div class="field">
          <textarea class="textarea" name="message" placeholder="How could we help you?" [(ngModel)]="message"></textarea>
        </div>

        <button type="submit" class="button is-dark is-medium">Submit</button>

      </form>

    </div>
    </section>
  `,
  styles: []
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(){
    const allInfo = `My name is ${this.name}. My email is ${this.email}. My message is ${this.message}`;
    alert(allInfo);
  }
}
