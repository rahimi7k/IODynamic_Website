import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Network } from '../../@core/Network';
import { Toast } from '../ui/toast/toast.component';
import { WebObject } from '../../@core/IONet/WebObject';
import { App } from '../../app.service';
import { StringUtils } from '../../@core/Utils/StringUtils';
import { Main } from 'app/main';
import { ButtonComponent } from '../ui/button/button.component';


@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent extends Main {

	public nameInput: HTMLInputElement;
	public emailInput: HTMLInputElement;
	public subjectInput: HTMLInputElement;
	public messagetInput: HTMLInputElement;

	@ViewChild("ContactUs_Button_Send") ticketBtnSend: ButtonComponent;


	constructor(private titleService: Title, private el: ElementRef, private renderer: Renderer2) {
		super();
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.ContactUs_Page_Title);
	}

	ngAfterViewInit(): void {

		this.nameInput = <HTMLInputElement>document.getElementById("ContactUs_Input_Name");
		this.emailInput = <HTMLInputElement>document.getElementById("ContactUs_Input_Email");
		this.subjectInput = <HTMLInputElement>document.getElementById("ContactUs_Input_Subject");
		this.messagetInput = <HTMLInputElement>document.getElementById("ContactUs_Input_Message");

		this.ticketBtnSend.setOnClickListener(() => {
			this.SendTicket();
		});

		super.ngAfterViewInit();
	}


	public async SendTicket(): Promise<void> {

		this.ticketBtnSend.setLock(true);

		if (this.emailInput.value === "") {
			this.ticketBtnSend.setLock(false);
			Toast.show(Toast.STATUS_ERROR, this.language.ContactUs_Hint_Email_Empty);
			return;
		} else if (!StringUtils.validateEmail(this.emailInput.value)) {
			this.ticketBtnSend.setLock(false);
			Toast.show(Toast.STATUS_ERROR, this.language.ContactUs_Hint_Email_Invalid);
			return;
		} else if (this.subjectInput.value === "") {
			this.ticketBtnSend.setLock(false);
			Toast.show(Toast.STATUS_ERROR, this.language.ContactUs_Hint_Subject_Empty);
			return;
		} else if (this.messagetInput.value === "") {
			this.ticketBtnSend.setLock(false);
			Toast.show(Toast.STATUS_ERROR, this.language.ContactUs_Hint_Message_Empty);
			return;
		}


		var req: WebObject.EmailSupport = new WebObject.EmailSupport;
		req.name = this.nameInput.value;
		req.application = "Followergir";
		req.header = this.subjectInput.value;
		req.message = this.messagetInput.value;
		req.email = this.emailInput.value;
		req.os = "Web";
		req.version = App.getVersion();

		var res: WebObject.EmailSupportResponse = await Network.requestPost("https://web.iodynamic.com/send_mail", JSON.stringify(req), null, "json", "json");
		console.log(res);

		if (res == null) {
			Toast.show(Toast.STATUS_ERROR, this.language.Toast_Content_Ticket_NotSend);

		} else {

			if (res.ok === true) {

				this.renderer.setProperty(this.subjectInput, "value", "");
				this.renderer.setProperty(this.messagetInput, "value", "");
				this.renderer.setProperty(this.emailInput, "value", "");
				Toast.show(Toast.STATUS_SUCCESS, this.language.Toast_Title_Ticket + "<br\>" + this.language.Toast_Content_Ticket);


				/*
				this.renderer.setProperty(this.captchaImage, 'src', 'assets/images/ic_lost_clock.gif');
				var audio = new Audio('assets/audio/au_lost_countdown.mp3');
				audio.play();
	
				setTimeout(() => {
				  audio = new Audio('assets/audio/au_lost_alarm.mp3');
				  audio.play();
				  setTimeout(() => {
					audio = new Audio('assets/audio/au_lost_alarm.mp3');
					audio.play();
				  }, 1000);
				}, 6100);
	
				setTimeout(() => {
				  this.captchaImage.style.visibility = "hidden";
				  this.captchaImage.style.height = "100px";
				  this.renderer.setProperty(this.captchaImage, 'src', 'assets/images/ic_lost_computer.gif');
				  setTimeout(() => {
					this.captchaImage.style.visibility = "visible";
					setTimeout(async () => {
					  this.captchaImage.style.visibility = "hidden";
					  await this.renderer.setProperty(this.captchaImage, 'src', "http://localhost:3344/captcha/CreateCaptcha" + "?" + new Date().getTime());
					  this.captchaImage.style.height = "70px";
					  setTimeout(() => {
						this.captchaImage.style.visibility = "visible";
						this.nameInput.value = "";
						this.emailInput.value = "";
						this.subjectInput.value = "";
						this.messagetInput.value = "";
						this.captchatInput.value = "";
	
						// Toast.show(this.lang["Toast_Title_Ticket"], this.lang["Toast_Content_Ticket"], "primary");
					  }, 200);
					}, 8040);
				  }, 100);
	
				}, 7810);
				*/

			} else {

				if (res.description === "PARAMETER_IS_MISSING") {
					Toast.show(Toast.STATUS_ERROR, this.language.Toast_Title_Ticket_NotSend + " < br\>" + this.language.Toast_Content_Ticket_NotSend);

				} else if (res.description === "TOO_MANY_ATTEMPT") {
					Toast.show(Toast.STATUS_ERROR, this.language.Toast_Ticket_Too_Many_Attemp);
				}
			}

		}

		this.ticketBtnSend.setLock(false);
	}



}

