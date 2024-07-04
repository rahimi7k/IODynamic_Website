import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Main } from '../../../main';

@Component({
	selector: 'ngx-membergir',
	templateUrl: './membergir.component.html',
	styleUrls: ['./membergir.component.scss'],
})
export class MembergirComponent extends Main {

	constructor(private titleService: Title) {
		super();
	}


	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.MembergirPage_Page_Title);
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
	}

	public onClickDownload(): void {
		var downloadElement: HTMLDivElement = <HTMLDivElement>document.getElementById("Membergir_Download");

		downloadElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",

		});
	}


}
