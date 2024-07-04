import { Injectable } from '@angular/core';
import { EnumUtils } from '../../@core/Utils/EnumUtils';

@Injectable({
	providedIn: 'root',
})
export class Color {

	public static getRandomColor(): string {
		return EnumUtils.getRandomFromStringEnum(Color.Color);
	}

	public static getRandomAttractiveColor(): string {
		return EnumUtils.getRandomFromStringEnum(Color.AttractiveColor);
	}

}

export namespace Color {
	export enum Color {
		White = "#ffffff",
		Black = "#000000",
		Red = "#e0334f",
		Green = "#41ce45",
		Blue = "#4293df",
		BlueSky = "#21bef4",
		Yellow = "#e5ec1e",
		Orange = "#f1920a",
		Gray = "#bfbfbf",
		Green_Successeful = "#25dc2a",
	}

	
	export enum AttractiveColor {
		Red = "#e0334f",
		Green = "#41ce45",
		Blue = "#4293df",
		BlueSky = "#21bef4",
		Yellow = "#e5ec1e",
		Orange = "#f1920a",
		Gray = "#bfbfbf",
		Green_Successeful = "#25dc2a",
	}
}