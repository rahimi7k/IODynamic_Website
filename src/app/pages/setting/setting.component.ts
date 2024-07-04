import { Component, Renderer2, NgZone, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbThemeService } from '@nebular/theme';
import { Setting } from './setting.service';
import { UITask } from '../ui/UITask';
import { HeaderComponent } from '../../@theme/components';
import { Main } from '../../main';
import { App } from '../../app.service';
import { Cli } from '../ui/cli/cli.service';
import { Subscription } from 'rxjs';
import { Media } from '../../@core/Audio';
import { StringUtils } from '../../@core/Utils/StringUtils';
import { PopUpComponent } from '../ui/popup/popup.component';
import { Toast } from '../ui/toast/toast.component';
import { ButtonComponent } from '../ui/button/button.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.scss'],
})
export class SettingComponent extends Main {

	private switchAudio: HTMLInputElement;
	// private dynamicContainer: HTMLDivElement;

	@ViewChild("Setting_Button_Theme_Default") btnThemeDefault: ButtonComponent;
	@ViewChild("Setting_Button_Theme_Dark") btnThemeDark: ButtonComponent;
	@ViewChild("Setting_Button_Theme_Cosmic") btnThemeCosmic: ButtonComponent;
	@ViewChild("Setting_Button_Language_En") btnLanguageEn: ButtonComponent;
	@ViewChild("Setting_Button_Language_Fa") btnLanguageFa: ButtonComponent;
	@ViewChild("Setting_Dynamic_Container", { read: ViewContainerRef }) public dynamicContainer: ViewContainerRef;



	private subscriptions: Subscription = new Subscription();

	public soundVolume: number = Setting.getVolume();
	public soundVolumeDisplay: string = this.soundVolume + "";


	constructor(private titleService: Title,
		public render: Renderer2,
		private themeService: NbThemeService,
		private zone: NgZone,
		public componentFactoryResolver: ComponentFactoryResolver,
		private router: Router) {

		super();

	}

	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.Setting_Page_Title);
	}

	ngAfterViewInit(): void {

		// this.switchCli = <HTMLInputElement>document.getElementById("Setting_Switch_Cli");
		this.switchAudio = <HTMLInputElement>document.getElementById("Setting_Switch_Audio");

		//this.switchCli.checked = App.getBoolean("Cli_Activity", true);
		this.switchAudio.checked = Setting.getAudioStatus();

		/*this.subscriptions.add(
			Setting.settingSubject.subscribe((action: string) => {
				if (action === "onClickCliClose") {
					this.onClickCliClose();
				}
			})
		);
		*/

		this.changeTheme(Setting.getTheme());

		this.btnThemeDefault.setOnClickListener(() => {
			this.changeTheme("default");
		});
		this.btnThemeDark.setOnClickListener(() => {
			this.changeTheme("dark");
		});
		this.btnThemeCosmic.setOnClickListener(() => {
			this.changeTheme("cosmic");
		});
		this.btnLanguageEn.setOnClickListener(() => {
			this.changeLanguage("en");
		});
		this.btnLanguageFa.setOnClickListener(() => {
			this.changeLanguage("fa");
		});

		var languageName: string = Setting.getLanguage();
		if (languageName === "en") {
			this.render.addClass(this.btnLanguageEn.getParentElement(), "button-select");
			this.btnLanguageEn.setDisable(true);
		} else if (languageName === "fa") {
			this.render.addClass(this.btnLanguageFa.getParentElement(), "button-select");
			this.btnLanguageFa.setDisable(true);
		}

		super.ngAfterViewInit();
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}





	public changeTheme(name: string) {

		if (this.btnThemeDefault != null) {
			this.render.removeClass(this.btnThemeDefault.getParentElement(), "button-select");
			this.btnThemeDefault.setDisable(false);
		}
		if (this.btnThemeDark != null) {
			this.render.removeClass(this.btnThemeDark.getParentElement(), "button-select");
			this.btnThemeDark.setDisable(false);
		}
		if (this.btnThemeCosmic != null) {
			this.render.removeClass(this.btnThemeCosmic.getParentElement(), "button-select");
			this.btnThemeCosmic.setDisable(false);
		}

		if (name === "default") {
			this.render.addClass(this.btnThemeDefault.getParentElement(), "button-select");
			this.btnThemeDefault.setDisable(true);

		} else if (name === "dark") {
			this.render.addClass(this.btnThemeDark.getParentElement(), "button-select");
			this.btnThemeDark.setDisable(true);

		} else if (name === "cosmic") {
			this.render.addClass(this.btnThemeCosmic.getParentElement(), "button-select");
			this.btnThemeCosmic.setDisable(true);

		} else {
			name = "default";
			this.render.addClass(this.btnThemeDefault.getParentElement(), "button-select");
			this.btnThemeDefault.setDisable(true);
		}


		if (name === Setting.getTheme()) {
			return;
		}

		// this.themeService.changeTheme(this.themeList[index].value + "-" + this.language);
		Setting.setTheme(name);
		this.themeService.changeTheme(name);
		HeaderComponent.updateMenuBorderBottom();
	}


	public changeLanguage(name: string) {
		// Setting.put("Language", name);
		// window.location.reload();
		window.location.href = window.location.protocol + '//' + window.location.host + "/" + name + "/setting";
	}



	/*public onClickCliSwitch(): void {
		if (this.switchCli.checked) { // Active
			Cli.cliLayerSubject.next("Show");
		} else {// Deactive
			Cli.cliLayerSubject.next("None");
		}
	}

	private onClickCliClose(): void {
		this.render.setProperty(this.switchCli, "checked", false);
		Cli.cliLayerSubject.next("None");
	}
		*/


	public onClickAudioSwitch(): void {
		if (this.switchAudio.checked) {
			Setting.setAudioStatus(true);
		} else {
			Setting.setAudioStatus(false);
		}
	}

	public onSoundVolumeSeekBarChange(e): void {
		let volume: number = Number.parseInt(e.target.value);
		Setting.setVolume(volume);
		this.soundVolumeDisplay = volume + "";
	}


}
