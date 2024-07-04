import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'apps-components',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


