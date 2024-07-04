import { Component, OnInit, AfterContentInit, Renderer2, HostListener } from '@angular/core';
import { AppInit } from '../../../../app/app-init.service';
import { Setting } from '../../../../app/pages/setting/setting.service';
import { Main } from '../../../main';


@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent extends Main {

  private footer: HTMLElement;

  constructor(private render: Renderer2) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterContentInit(): void {
    // this.updateLogo();

    this.footer = <HTMLElement>document.getElementsByTagName("nb-layout-footer")[0];
    this.onResize();

  }


  public updateLogo(): void {
    var logo = document.getElementById("footer_iodynamic_logo");
    if (Setting.getTheme() === "default" || Setting.getTheme() === "corporate") {
      this.render.setStyle(logo, "src", "assets/images/ic_iodynamic_default.png");
    } else if (Setting.getTheme() === "dark" || Setting.getTheme() === "cosmic") {
      this.render.setProperty(logo, "src", "assets/images/ic_iodynamic_white.png");
    }
    logo.ondragstart = function () { return false; };
    logo.addEventListener('contextmenu', event => event.preventDefault());
  }


  @HostListener('window:resize', ['$event']) public onResize() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (this.footer != null) {
      if (w <= 575) {
        this.footer.style.display = "none";
      } else {
        this.footer.style.display = "block";
      }
    }
  }

}
