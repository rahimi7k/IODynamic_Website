import { Component } from '@angular/core';
import { Setting } from 'app/pages/setting/setting.service';
import { ManageData } from '../../../@core/ManageData';
import { AppComponent } from '../../../app.component';
import { Media } from '../../../@core/Audio';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
})
export class Toast {

	public direction: string = Setting.getDirection();

	private static toast: HTMLDivElement;
	private static header: HTMLParagraphElement;
	private static message: HTMLParagraphElement;
	private static imageContainer: HTMLImageElement;

	public static readonly STATUS_DEFAULT: number = 0x00;
	public static readonly STATUS_ERROR: number = 0x01;
	public static readonly STATUS_WARNING: number = 0x02;
	public static readonly STATUS_SUCCESS: number = 0x03;

	private static toastTimer: NodeJS.Timeout;
	private static showTime: number = 0;

	private static currentMeesage: string = "";
	private static currentStatus: number = 0;
	private static reserveMeesage: string = "";
	private static reserveStatus: number = 0;
	private static hasReserved: boolean = false;


	constructor() { }


	public static async show(status: number, meesage: string): Promise<void> {
		Toast.showTime += 1;
		if (Toast.showTime > 1) {
			if (status !== Toast.currentStatus || meesage !== Toast.currentMeesage) {
				Toast.hasReserved = true;
				Toast.reserveStatus = status;
				Toast.reserveMeesage = meesage;
			}
			Toast.showTime -= 1;
			return;
		}
		
		if (Toast.hasReserved) {
			Toast.hasReserved = false;
			clearTimeout(Toast.toastTimer);
		}

		Toast.currentStatus = status;
		Toast.currentMeesage = meesage;

		if (Toast.toast == null) {
			Toast.toast = <HTMLDivElement>document.getElementById("Toast");
			if (Toast.toast != null) {
				Toast.imageContainer = <HTMLImageElement>document.getElementById("Toast_Image");
				Toast.header = <HTMLParagraphElement>document.getElementById("Toast_Header");
				Toast.message = <HTMLParagraphElement>document.getElementById("Toast_Msg");
			}
		}

		if (Toast.toast != null) {

			var header: string;
			switch (status) {
				case (Toast.STATUS_DEFAULT):
					header = AppComponent.language.Notification;
					AppComponent.render.setProperty(Toast.imageContainer, "src", "assets/svg/info.svg");
					Media.playAudio("au_toast_notification.wav");
					break;

				case (Toast.STATUS_ERROR):
					header = AppComponent.language.Error;
					Toast.toast.classList.add("error");
					AppComponent.render.setProperty(Toast.imageContainer, "src", "assets/svg/close.svg");
					Media.playAudio("au_toast_error.mp3");
					break;

				case (Toast.STATUS_WARNING):
					header = AppComponent.language.Warning;
					Toast.toast.classList.add("warning");
					AppComponent.render.setProperty(Toast.imageContainer, "src", "assets/svg/warning.svg");
					Media.playAudio("au_toast_warning.mp3");
					break;

				case (Toast.STATUS_SUCCESS):
					header = AppComponent.language.Notification;
					Toast.toast.classList.add("success");
					AppComponent.render.setProperty(Toast.imageContainer, "src", "assets/svg/tik_green.svg");
					Media.playAudio("success.mp3");
					break;


				default:
					header = AppComponent.language.Notification;
					Toast.imageContainer.src = await ManageData.download("assets/images/ic_info.png");
					break;
			}

			Toast.header.innerHTML = header;
			Toast.message.innerHTML = meesage;

			Toast.toast.classList.add("show");


			Toast.toastTimer = setTimeout(() => {

				Toast.endToast(status);

				Toast.showTime -= 1;
				if (Toast.hasReserved) {
					setTimeout(() => {
						Toast.show(Toast.reserveStatus, Toast.reserveMeesage);
					}, 150);
				}
			}, 3920);
		}

	}


	public onToastClick(): void {
		clearTimeout(Toast.toastTimer);

		if (Toast.hasReserved) {
			Toast.hasReserved = false;
			Toast.reserveMeesage = "";
			Toast.reserveStatus = 0;
		}

		Toast.endToast(Toast.currentStatus);

		Toast.showTime -= 1;
	}


	private static endToast(status: number): void {
		Toast.toast.classList.remove("show");

		if (status === Toast.STATUS_ERROR) {
			Toast.toast.classList.remove("error");
		} else if (status === Toast.STATUS_WARNING) {
			Toast.toast.classList.remove("warning");
		} else if (status === Toast.STATUS_SUCCESS) {
			Toast.toast.classList.remove("success");
		}
	}


}
