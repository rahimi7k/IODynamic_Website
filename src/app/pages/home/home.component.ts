import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Toast } from '../ui/toast/toast.component';
import { Main } from '../../main';
import { ButtonComponent } from '../ui/button/button.component';
import { Color } from '../ui/color';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends Main {

	@ViewChild("Home_Followergir_App") btnFollowergirApp: ButtonComponent;
	@ViewChild("Home_Followergir_Buy") btnFollowergirBuy: ButtonComponent;
	@ViewChild("Home_Followergir_Description") btnFollowergirDescription: ButtonComponent;
	@ViewChild("Home_Membergir_App") btnMembergirApp: ButtonComponent;
	@ViewChild("Home_Membergir_Buy") btnMembergirBuy: ButtonComponent;
	@ViewChild("Home_Membergir_Description") btnMembergirDescription: ButtonComponent;

	constructor(private titleService: Title) {
		super();
	}


	ngOnInit(): void {
		this.titleService.setTitle(this.language.Home_Page_Title);
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();

		this.btnFollowergirApp.setSize("140px", null);
		this.btnFollowergirBuy.setSize("140px", null);
		this.btnFollowergirDescription.setSize("140px", null);

		this.btnFollowergirApp.setColor(Color.Color.BlueSky);
		this.btnFollowergirBuy.setColor(Color.Color.Green);


		this.btnFollowergirApp.setOnClickListener(() => {
			window.location.href = "https://followergir.iodynamic.com";
		});




		this.btnMembergirApp.setSize("140px", null);
		this.btnMembergirBuy.setSize("140px", null);
		this.btnMembergirDescription.setSize("140px", null);

		this.btnMembergirApp.setColor(Color.Color.BlueSky);
		this.btnMembergirBuy.setColor(Color.Color.Green);

		this.btnMembergirApp.setOnClickListener(() => {
			// window.location.href = "https://membergir.iodynamic.com";
			Toast.show(Toast.STATUS_DEFAULT, this.language.Home_On_Working);
		});
	}




}

