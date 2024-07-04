import { LanguageFA } from '../../@theme/language/language_fa';


export class DateUtils {

	public static readonly Date_Type_MiliSecond: number = 0x01;
	public static readonly Date_Type_Second: number = 0x02;
	public static readonly Date_Type_Minute: number = 0x03;
	public static readonly Date_Type_Hour: number = 0x04;
	public static readonly Date_Type_Day: number = 0x05;
	public static readonly Date_Type_Month: number = 0x06;
	public static readonly Date_Type_Year: number = 0x07;


	public static getSecondUnixTime(): number {
		return Math.floor(Date.now() / 1000); // remove milisecond, 3 digits
	}

	public static convertMiliSecondToSecond(unxiTimeMiliSecond: number): number {
		return Math.floor(unxiTimeMiliSecond / 1000); // remove milisecond, 3 digits
	}


	public static getCustomDate(time: number, isDateInFuture: boolean, dateType: number): Date {
		var date: Date = new Date(Date.now());
		var customDate: Date;

		//Date.now() === date.getTime()

		if (dateType === DateUtils.Date_Type_MiliSecond) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + time);
			} else {
				customDate = new Date(date.getTime() - time);
			}

		} else if (dateType === DateUtils.Date_Type_Second) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 1000));
			}

		} else if (dateType === DateUtils.Date_Type_Minute) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 60 * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 60 * 1000));
			}

		} else if (dateType === DateUtils.Date_Type_Hour) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 60 * 60 * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 60 * 60 * 1000));
			}

		} else if (dateType === DateUtils.Date_Type_Day) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 24 * 60 * 60 * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 24 * 60 * 60 * 1000));
			}

		} else if (dateType === DateUtils.Date_Type_Month) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 30 * 24 * 60 * 60 * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 30 * 24 * 60 * 60 * 1000));
			}

		} else if (dateType === DateUtils.Date_Type_Year) {
			if (isDateInFuture) {
				customDate = new Date(date.getTime() + (time * 365 * 30 * 24 * 60 * 60 * 1000));
			} else {
				customDate = new Date(date.getTime() - (time * 365 * 30 * 24 * 60 * 60 * 1000));
			}

		} else {
			return null;
		}

		return customDate;
	}



	public static secondsToHhMmSs(seconds: number): string {
		var sec_num: number = seconds;
		var hours: number = Math.floor(sec_num / 3600);
		var minutes: number = Math.floor(sec_num / 60) % 60;
		var seconds: number = sec_num % 60;

		return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v)
			.filter((v, i) => v !== "00" || i > 0)
			.join(":");
	}

	public static secondsToDdHhMmSs(seconds: number): string {
		var sec_num: number = seconds;
		var days: number = Math.floor(sec_num / 86400);
		var hours: number = Math.floor(sec_num / 3600) % 24;
		var minutes: number = Math.floor(sec_num / 60) % 60;
		var seconds: number = sec_num % 60;

		return [days, hours, minutes, seconds].map(v => v < 10 ? "0" + v : v)
			.filter((v, i) => v !== "00" || i > 0)
			.join(":");
	}



}


