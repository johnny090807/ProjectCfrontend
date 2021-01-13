import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer is-dark is-bold">
      <div class="content has-text-centered">
        <p>
          Majority of the design by: Reynethan Leon
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #363636;
      color: #ffffff;
      padding: 1.5rem 1.5rem 1.5rem;
}
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
