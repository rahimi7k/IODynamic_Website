import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Main } from '../../../main';

@Component({
  selector: 'ngx-mobilebank',
  templateUrl: './mobilebank.component.html',
  styleUrls: ['./mobilebank.component.scss'],
})
export class MobilebankComponent extends Main {

  constructor(private titleService: Title) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.titleService.setTitle('Microks - Mobile Bank Application');
  }

}
