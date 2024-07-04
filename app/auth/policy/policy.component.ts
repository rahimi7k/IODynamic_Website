import { Component, OnInit } from '@angular/core';
import { Setting } from 'app/pages/setting/setting.service';

@Component({
  selector: 'ngx-policy',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class PolicyComponent implements OnInit {

  public static langPolicy: JSON;

  constructor() { }

  ngOnInit(): void {
    //PolicyComponent.langPolicy = require('./languages/policy-' + Setting.getLanguage() + '.json');
  }

}
