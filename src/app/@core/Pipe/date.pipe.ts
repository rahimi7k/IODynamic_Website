import { Pipe, PipeTransform } from '@angular/core';
import { Setting } from '../../pages/setting/setting.service';

@Pipe({
	name: 'datePipe', // DO NOT USE '-' DASH IN NAME, ANGULAR ERROR
})
export class DatePipe implements PipeTransform {

	constructor() { }

	public transform(timestamp: number): string {
		/*
		var date = new Date(timestamp * 1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		// Will display time in 10:30:23 format
		var formattedTime: string = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		*/

		var date: string;
		var time: string;
		if (Setting.getLanguage() === "fa") {
			date = new Date(timestamp).toLocaleDateString("fa-IR")
			time = new Date(timestamp).toLocaleTimeString("fa-IR")
		} else {
			date = new Date(timestamp).toLocaleDateString("en-US")
			time = new Date(timestamp).toLocaleTimeString("en-US")
		}
		return date + " " + time;
	}

}