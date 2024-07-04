import { Injectable } from '@angular/core';
import { StorageUtils } from '../../../app/@core/Utils/StorageUtils';
import { Network } from '../../@core/Network';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class Setting {


	private static theme: string;
	private static font: string;
	public static settingSubject = new Subject();

	public static readonly THEMES = [
		{
			value: 'default',
			pic: 'ic_theme_1.png',
		},
		{
			value: 'dark',
			pic: 'ic_theme_2.png',
		},
		{
			value: 'cosmic',
			pic: 'ic_theme_3.png',
		},
	];

	public static readonly LANGUAGES = [
		{
			value: 'en',
			pic: 'ic_language_1.png',
		},
		{
			value: 'fa',
			pic: 'ic_language_2.png',
		},
	];


	public static getTheme(): string {
		if (Setting.theme == null) {
			Setting.theme = StorageUtils.getString(StorageUtils.Setting, "Theme", "default");
		}
		return Setting.theme;
	}

	public static setTheme(theme: string): void {
		Setting.theme = theme;
		StorageUtils.put(StorageUtils.Setting, "Theme", theme);
	}

	public static getFont(): string {
		if (Setting.font != null) {
			return Setting.font;
		}
		if (Setting.getLanguage() === "fa") {
			Setting.font = "WebYekan";
		} else {
			Setting.font = "OpenSans";
		}
		return Setting.font;

	}

	public static setFont(font: string): void {
		Setting.font = font;
		StorageUtils.put(StorageUtils.Setting, "Font", font);
	}


	public static getDirection(): string {
		if (Setting.getLanguage() === "fa") {
			return "rtl";
		}

		return "ltr";
	}



	public static getLanguage(): string {

		var language: string = StorageUtils.getString(StorageUtils.Setting, "Language", null);
		if (language != null) {
			return language;
		}

		language = Setting.getUserLanguage();
		if (language != null) {
			if (language == "fa-IR" || language == "fa") {
				return "fa";
			}
		}

		return "en";
	}


	private static getUserLanguage(): string {

		var nav = window.navigator,
			browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
			i,
			language;

		// support for HTML 5.1 "navigator.languages"
		if (Array.isArray(nav.languages)) {
			for (i = 0; i < nav.languages.length; i++) {
				language = nav.languages[i];
				if (language && language.length) {
					return language;
				}
			}
		}

		// support for other well known properties in browsers
		for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
			language = nav[browserLanguagePropertyKeys[i]];
			if (language && language.length) {
				return language;
			}
		}

		return null;
	}




	private static async getCountry(): Promise<string> {
		return new Promise<string>(async (resolve): Promise<void> => {

			var res: string = await Network.requestGet("https://www.cloudflare.com/cdn-cgi/trace", null);
			console.log(res);
			console.log(typeof res);
			if (res == null) {
				resolve("us");
				return;
			}
			var parametes: string[] = res.split("\n");
			for (var param of parametes) {
				if (param.includes("loc=")) {
					resolve(param.replace("loc=", "").toLowerCase());
					return;
				}
			}
			resolve("us");
		});
	}

	private static convertCoutryToLanguage(country: string): string {
		if (country === "ir") {
			return "fa";
		} else {
			return "en";
		}
	}




	public static getAudioStatus(): boolean {
		return StorageUtils.getBoolean(StorageUtils.Setting, "IsAudioEnabled", true);
	}

	public static setAudioStatus(isEnable: boolean): void {
		if (isEnable) {
			StorageUtils.remove(StorageUtils.Setting, "IsAudioEnabled");
		} else {
			StorageUtils.put(StorageUtils.Setting, "IsAudioEnabled", false);
		}
	}

	public static getVolume(): number {
		return StorageUtils.getNumber(StorageUtils.Setting, "AudioVolume", 75);
	}

	public static setVolume(volume: number): void {
		StorageUtils.put(StorageUtils.Setting, "AudioVolume", volume);
	}





}
