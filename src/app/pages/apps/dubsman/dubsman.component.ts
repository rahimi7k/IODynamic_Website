import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Main } from '../../../main';

@Component({
  selector: 'ngx-dubsman',
  templateUrl: './dubsman.component.html',
  styleUrls: ['./dubsman.component.scss'],
})
export class DubsmanComponent extends Main {

  constructor(private titleService: Title) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.titleService.setTitle(this.language.Dubsman_Page_Title);

  }

}
