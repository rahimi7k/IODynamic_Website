import { EnumType } from 'typescript';

export class EnumUtils {

	// Math.random() ==> inclusive of 0, but not 1 - (1 is exclusive)
	public static getRandomFromNumberEnum(e: Object): number {
		let index: number = Math.floor(Math.random() * Object.keys(e).length / 2);
		// return e[key];
		return Object.values(e)[index];
	}

	public static getRandomFromStringEnum(e: Object): string {
		let index: number = Math.floor(Math.random() * Object.keys(e).length);
		return Object.values(e)[index];
	}

	/*
	public static getKeyByValueFromNumberEnum(e: Object, value: string) {
		return e[value];
	}

	public static getKeyByValueFromStringEnum<T>(e: T, value: string): EnumType {
		return <EnumType> <unknown> Object.entries(e).find(([key, val]) => val === value)?.[0];
	}


	public static getValueByKeyForNumberEnum(e: Object, myKey: string) {
		return Object.entries(e).find(([key, val]) => key === myKey)?.[1];
	}

	public static getValueByKeyForStringEnum(e: Object, myKey: string) {
		return Object.entries(e).find(([key, val]) => key === myKey)?.[1];
	}
	*/



}


