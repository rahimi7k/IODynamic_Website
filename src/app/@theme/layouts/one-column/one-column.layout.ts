import { Component, AfterViewInit, HostListener, Renderer2 } from '@angular/core';

@Component({
	selector: 'ngx-one-column-layout',
	styleUrls: ['./one-column.layout.scss'],
	template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <app-header></app-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <app-footer></app-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements AfterViewInit {

	constructor(private render: Renderer2) {
	}

	ngAfterViewInit(): void {
		this.fixDisplay();
	}


    // be here untill I fix the library
    @HostListener('window:resize', ['$event']) private onResize() {
        this.fixDisplay();
    }

    public fixDisplay(): void {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var layout = document.getElementsByTagName("nb-layout-column");
        if (layout[0] != null) {
            if (w <= 575) {
                this.render.setStyle(layout[0], 'padding', "0");
            } else {
                this.render.setStyle(layout[0], 'padding', "16px");
            }
        }
    }


}
