import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AppComponent } from '../app.component';
import { Setting } from './setting/setting.service';

@Component({
	selector: 'ngx-pages',
	styleUrls: ['pages.component.scss'],
	template: `
    <ngx-one-column-layout>
      <nb-menu [items]="MENU_ITEMS"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

	private language: string = Setting.getLanguage();
	public readonly MENU_ITEMS: NbMenuItem[] = [
		{
			title: AppComponent.language.Menu_Home,
			icon: "home-outline",
			link:  "/" + this.language + "/home",
			home: true,
		}, {
			title: AppComponent.language.Menu_Login_Application,
			icon: 'browser',
			children: [
				{
					title: AppComponent.language.Menu_Login_Application_Followergir,
					// link: 'https://followergir.iodynamic.com',
					url: 'https://followergir.iodynamic.com',
					// url: '#',
				},
				/* {
				   title: this.language.Menu_Login_Application_Membergir,
				   url: 'https://membergir.iodynamic.com',
				 },*/
				/*{
				  title: AppInit.lang['Menu_Application_Dubsman'],
				  link: '/apps/dubsman',
				},
				{
				  title: AppInit.lang['Menu_Application_MobileBank'],
				  link: '/apps/mobilebank',
				},*/
			],
		},


		{
			title: AppComponent.language.Menu_Application_Info,
			icon: 'file-text-outline',
			children: [
				{
					title: AppComponent.language.Menu_Application_Followergir,
					link: "/" + this.language + '/apps/followergir',
				},
				{
					title: AppComponent.language.Menu_Application_Membergir,
					link: "/" + this.language + '/apps/membergir',
				},
			],
		},
		{
			title: AppComponent.language.Menu_Shop,
			icon: 'shopping-cart',
			link: "/" + this.language + '/shop',

		},
		{
			title: AppComponent.language.Menu_ContactUs,
			icon: 'email',
			link: "/" + this.language + '/contact-us',
		},
		{
			title: AppComponent.language.Api_Title,
			icon: 'monitor',
			link: "/" + this.language + '/api',
		},
		{
			title: AppComponent.language.Menu_Setting,
			icon: 'settings',
			link: "/" + this.language + '/setting',
		},
	];

	constructor(private element: ElementRef) {
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.onResize();
	}

	ngOnDestroy(): void {
	}



	@HostListener('window:resize', ['$event']) public onResize() {
		var w: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (w <= 575) {
			this.element.nativeElement.style.setProperty('--page-header-image-height', '89px');
			this.element.nativeElement.style.setProperty('--page-header-image-width', '89px');
		} else {
			this.element.nativeElement.style.setProperty('--page-header-image-height', '110px');
			this.element.nativeElement.style.setProperty('--page-header-image-width', '110px');
		}
	}



}
