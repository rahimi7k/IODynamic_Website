import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PolicyComponent } from '../policy.component';
import { Main } from '../../../main';


@Component({
  selector: 'app-terms',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent extends Main {

    constructor(private titleService: Title) {
      super();
  }


  ngOnInit(): void {
    //this.language = PolicyComponent.langPolicy;
    this.titleService.setTitle(this.language.Privacy_Policy_Page_Title);
  }

  ngAfterViewChecked(): void {
  }

}
