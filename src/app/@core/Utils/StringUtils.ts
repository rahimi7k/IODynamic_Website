import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { LanguageFA } from '../../@theme/language/language_fa';

export class StringUtils {


	public static readonly countries: Map<string, string> = new Map<string, string>();

	public static readonly CHARACTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
	public static readonly CHARACTERS_HEX: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	public static readonly CHARACTERS_ALPHABET: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];



	public static generateHash(length: number): string {
		var stringBuilder: string = "";
		for (var i = 0; i < length; i++) {
			stringBuilder += StringUtils.CHARACTERS.charAt(StringUtils.random(0, StringUtils.CHARACTERS.length - 1));
		}
		return stringBuilder;
	}


	public static generateUniqueId(): string {
		return Date.now() + StringUtils.generateHash(8);
	}



	public static stringToHex(hex: string) {
		var str = '';
		for (var i = 0; i < hex.length; i++) {
			str += hex[i].charCodeAt(0).toString(16);
		}
		return str;
	}

	public static hexToString(hex: string) {
		var str = '';
		for (var n = 0; n < hex.length; n += 2) {
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
		}
		return str;
	}



	public static byteToString(bytes: any[]): string {
		var result = "";
		for (var i = 0; i < bytes.length; i++) {
			result += (String.fromCharCode(bytes[i]));
		}
		return result;
	}


	public static byteToHex1(byteArray): string {
		return Array.from(byteArray, function (byte: any) {
			return ('0' + (byte & 0xFF).toString(16)).slice(-2);
		}).join('');
	}

	public static byteToHex2(bytes): string {
		var stringBuilder: string = "";
		for (var i = 0; i < bytes.length; i++) {
			stringBuilder += StringUtils.CHARACTERS_HEX[(bytes[i] >> 4) & 0x0f] + StringUtils.CHARACTERS_HEX[bytes[i] & 0x0f];
		}
		return stringBuilder.toString();
	}


	public static byteToHex3(byteArray): string {
		return Array.prototype.map.call(byteArray, function (byte) {
			return ('0' + (byte & 0xFF).toString(16)).slice(-2);
		}).join('');
	}

	public static hexToByte(hex: string): any {
		var bytes: any[] = [];
		for (var i = 0; i < hex.length; i += 2) {
			bytes.push(parseInt(hex.substr(i, 2), 16));
		}
		return bytes;
	}




	public static isEmpty(str: string): boolean {
		return (str == null || str.length === 0);
	}

	public static hasNumber(str) {
		return /\d/.test(str);
	}


	public static parseInt(number: string): number {
		try {
			return Number.parseInt(StringUtils.toNumberFormat(number));
		} catch (ex) { }
		return 0;
	}

	public static toNumberFormat(digit: string, emptyValue?: string): string {
		if (StringUtils.isEmpty(digit)) {
			return emptyValue == null ? "0" : emptyValue;
		}
		digit = digit.replace(/[^\d\-]+/mg, "")/*.replace(/(?<!^)\-/mg, "")*/; // Because of Safari Error Regex lookahead (?<
		return digit.replace("-", "").replace(/^0+(?!$)/mg, "") === "" ? "0" : digit;
		// return new RegExp("(?<!^)\\-", "i").exec(new RegExp("[^\\d\\-]+", "i").exec(number)).;
	}


	public static parseBool(str: any): boolean {
		if (typeof (str) === 'string') {
			str = str.trim().toLowerCase();
		}
		switch (str) {
			case true:
			case "true":
			case 1:
			case "1":
			case "on":
			case "yes":
				return true;
			default:
				return false;
		}
	}


	/**
	 * Random() return between min and max and include both min and max [], Unlike the Math.random that only support min [)
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	public static random(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		if (Math.random() < 0.5) {
			return Math.floor(Math.random() * (max - min) + min);
		} else {
			return Math.ceil(Math.random() * (max - min) + min);
		}
	}



	public static onDigitGrouping(num: number): string;
	public static onDigitGrouping(num: string): string;
	public static onDigitGrouping(num: number | string): string {
		var str: string;
		if (typeof (num) === "number") {
			str = num.toString();
		} else {
			str = num;
		}

		var j: number = 0;
		var res: string = "";
		for (var i: number = str.length - 1; i >= 0; i--) {
			if (str[i] === '.') {
				res = '.' + res;
				j = 0;
				continue;
			}
			if (j % 3 == 0 && j !== 0) {
				res = ',' + res;
			}
			res = str[i] + res;
			j++;
		}
		return res;
		//<\u06F0 to \u06F9> //persian numbers 0, 9
		//return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}






	public static copyToClipboard(text: string, delegate: (result: boolean) => void): void {

		if (!navigator.clipboard) {
			StringUtils.copyToClipboardOldMethod(text, delegate);
			return;
		}

		navigator.clipboard.writeText(text).then(() => {
			if (delegate != null) {
				delegate(true);
			}
		}, (err) => {
			console.error('Unable to copy -- New Method', err);
			delegate(false);
		});

		return;
	}


	public static copyToClipboardOldMethod(text: string, delegate: (result: boolean) => void): boolean {

		const textArea = document.createElement('textarea')
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		textArea.setSelectionRange(0, 99999); /* For mobile devices */

		try {
			var res: boolean = document.execCommand('copy');
			document.body.removeChild(textArea);
			if (delegate != null) {
				delegate(res);
			}
		} catch (err) {
			console.error('Unable to copy -- Old Method', err);
			document.body.removeChild(textArea);
			delegate(false);
		}

		return;
	}



	public static initPhoneFormat(): void {
		const httpClient: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

		httpClient.get('assets/countries.txt', { responseType: 'text' }).subscribe((data) => {
			var str: string[] = data.split("\n");
			for (var i = 0; i < str.length; i++) {
				let indexSime = str[i].indexOf(";");
				StringUtils.countries.set(str[i].substring(0, indexSime), str[i].substring(indexSime + 1, str[i].length - 1));
			}
		});

	}

	public static validateEmail(email: string) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}



	public static checkLanguageDirection(element: HTMLElement): void {
		var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
			rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
			rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

		if (rtlDirCheck.test(StringUtils.removeEmoji(element.innerHTML.substr(0, 20)).charAt(0))) {
			element.style.direction = "rtl";
			element.style.textAlign = "right";
		} else {
			element.style.direction = "ltr";
			element.style.textAlign = "left";
		}
	}

	public static isRtl(str: string): boolean {
		if (str === "" || str == null) {
			return false;
		}
		var c: number = str.charCodeAt(0);
		return c >= 0x590 && c <= 0x6FF;
	}


	public static isTextIncludeEmoji(text: string): boolean {
		// var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		/*var regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
		var reqExp = new RegExp(regex);
		return reqExp.test(text);*/
		var ranges = [
			'(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
		];
		if (text.match(ranges.join('|'))) {
			return true;
		} else {
			return false;
		}
	}

	public static removeEmoji(text: string): string {
		var ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g; // U+1F680 to U+1F6FF
		return text.replace(ranges, '');
	}





	public static parseBigInt(bigint, base): any[] {
		// convert bigint string to array of digit values
		var values = [];
		for (var i: number = 0; i < bigint.length; i++) {
			values[i] = parseInt(bigint.charAt(i), base);
		}
		return values;
	}

	public static formatBigInt(values, base): string {
		// convert array of digit values to bigint string
		var bigint: string = '';
		for (var i = 0; i < values.length; i++) {
			bigint += values[i].toString(base);
		}
		return bigint;
	}


	public static convertBase(bigint, inputBase, outputBase): string {
		// takes a bigint string and converts to different base
		var inputValues = StringUtils.parseBigInt(bigint, inputBase),
			outputValues = [], // output array, little-endian/lsd order
			remainder,
			len = inputValues.length,
			pos = 0,
			i;
		while (pos < len) { // while digits left in input array
			remainder = 0; // set remainder to 0
			for (i = pos; i < len; i++) {
				// long integer division of input values divided by output base
				// remainder is added to output array
				remainder = inputValues[i] + remainder * inputBase;
				inputValues[i] = Math.floor(remainder / outputBase);
				remainder -= inputValues[i] * outputBase;
				if (inputValues[i] === 0 && i === pos) {
					pos++;
				}
			}
			outputValues.push(remainder);
		}
		outputValues.reverse(); // transform to big-endian/msd order
		return StringUtils.formatBigInt(outputValues, outputBase);
	}



	public static formatString(str: string, ...val: any[]) {
		for (let i = 0; i < val.length; i++) {
			str = str.replace(`{${i}}`, val[i] + "");
		}
		return str;
	}


	public static formatNumbers(figures: number, language: string): string {

		if (language === "fa") {

			var figuresArray: string[] = (figures + "").split('');
			var num: string;
			for (var i = 0; i < figuresArray.length; i++) {
				num = figuresArray[i];
				if (LanguageFA.persianFigures[num]) {
					figuresArray[i] = LanguageFA.persianFigures[num];
				}
			}
			return figuresArray.join('');
		} else {
			return figures + "";
		}
	}


	public static formatNumbersToEnglish(figures: string): string {
		var figuresArray: string[] = figures.split('');
		var characters: string = "";
		for (var i = 0; i < figuresArray.length; i++) {
			switch (figuresArray[i]) {
				case (LanguageFA.persianFigures[0]):
					characters += 0;
					break;
				case (LanguageFA.persianFigures[1]):
					characters += "1";
					break;
				case (LanguageFA.persianFigures[2]):
					characters += "2";
					break;
				case (LanguageFA.persianFigures[3]):
					characters += "3";
					break;
				case (LanguageFA.persianFigures[4]):
					characters += "4";
					break;
				case (LanguageFA.persianFigures[5]):
					characters += "5";
					break;
				case (LanguageFA.persianFigures[6]):
					characters += "6";
					break;
				case (LanguageFA.persianFigures[7]):
					characters += "7";
					break;
				case (LanguageFA.persianFigures[8]):
					characters += "8";
					break;
				case (LanguageFA.persianFigures[9]):
					characters += "9";
					break;

				default:
					characters += figuresArray[i];
					break
			}
		}

		return characters;
	}


	public static splitStringByLength(text: string, maxLength: number): string {
		var endOfSentence: string = text.length > maxLength ? "..." : "";
		return text.substring(0, Math.min(text.length, maxLength)) + endOfSentence;
	}


	public static ConvertJsonToLowerKeys(json: JSON) {
		return Object.keys(json).reduce((accumulator, key) => {
			accumulator[key.toLowerCase()] = json[key];
			return accumulator;
		}, {});
	}

	public static getRandomFromMap(map: Map<any, any>) {
		let index: number = Math.floor(Math.random() * map.size);
		let cntr: number = 0;
		for (let key of map.keys()) {
			if (cntr++ === index) {
				return key;
			}
		}
	}


	public static isTextHasAlphabetCharacter(text: string): boolean {
		const regExp: RegExp = /[a-zA-Z]/;
		return regExp.test(text);
	}

	public static isTextHasOnlyNumbers(text: string): boolean {
		const regExp: RegExp = /^\d+$/;
		return regExp.test(text);
	}

}


