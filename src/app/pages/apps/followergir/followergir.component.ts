import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Main } from '../../../main';

@Component({
	selector: 'app-followergir',
	templateUrl: './followergir.component.html',
	styleUrls: ['./followergir.component.scss'],
})
export class FollowergirComponent extends Main {

	constructor(private titleService: Title) {
		super();
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.FollowergirPage_Page_Title);
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
	}




	public onClickDownload(): void {
		var downloadElement: HTMLDivElement = <HTMLDivElement>document.getElementById("Followergir_Download");

		downloadElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",

		});
	}
}
