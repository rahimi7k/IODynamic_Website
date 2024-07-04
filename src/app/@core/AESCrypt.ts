/**
 * parse means that will return "word" or bytes  or [124124124, 21412414, 124141241, 4124124124]
 * Example:
 * var words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
 * var base64 = CryptoJS.enc.Base64.stringify(words);
 */

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ByteUtils } from './Utils/byte_utils';

@Injectable({
	providedIn: 'root',
})
export abstract class AESCrypt {

	public static readonly ivBytes: Uint8Array = new Uint8Array(16);


	public static encrypt(message: string, key: Uint8Array, iv: Uint8Array): string {
		var byteArray: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(message);
		var cipher = CryptoJS.AES.encrypt(byteArray, CryptoJS.lib.WordArray.create(key), {
			iv: CryptoJS.lib.WordArray.create(iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return cipher.toString(); //It is base64 and It is wordarray
	}

	public static encryptToString(message: string, pass: string): string {
		var byteArray = CryptoJS.enc.Utf8.parse(message);
		var bytePassword = CryptoJS.SHA256(pass);

		var cipher = CryptoJS.AES.encrypt(byteArray, bytePassword, {
			iv: CryptoJS.lib.WordArray.create(AESCrypt.ivBytes),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return cipher.toString();
	}

	public static decrypt(uint8Array: Uint8Array, key: Uint8Array, iv: Uint8Array): string {
		var wordArray: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create(uint8Array);
		var stringBase64: string = CryptoJS.enc.Base64.stringify(wordArray); // In base64 stringi mikone: ==>
		// (2) kar dare mikone:
		// 1- Dare base64 mikone,
		// 2- dare word ro string mikone

		//Example:
		//var words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
		//console.log(new TextDecoder().decode(ByteUtils.convertWordArrayToUint8Array(words))); ==> output: "Hello, World!"

		var bytes = CryptoJS.AES.decrypt(stringBase64, CryptoJS.lib.WordArray.create(key), {
			iv: CryptoJS.lib.WordArray.create(iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return bytes.toString(CryptoJS.enc.Utf8);
	}

	public static decryptToString(cipherText: string, password: string): string {
		var bytePassword = CryptoJS.SHA256(password);

		var bytes = CryptoJS.AES.decrypt(cipherText, bytePassword, {
			iv: CryptoJS.lib.WordArray.create(AESCrypt.ivBytes),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return bytes.toString(CryptoJS.enc.Utf8);
	}


	/**
	 * Decode base64 and return Uint8Array
	 * @param stringBase64
	 * @returns Uint8Array
	 */
	public static decodeBase64(stringBase64: string): Uint8Array {
		var words = CryptoJS.enc.Base64.parse(stringBase64);

		/*var hex: string = CryptoJS.enc.Hex.stringify(words);	//Khodemon convertWordArrayToUint8Array
		var uint8Array: Uint8Array = new Uint8Array(hex.length / 2);
		for (var i = 0; i < hex.length; i += 2) {
			uint8Array[i / 2] = parseInt(hex.substr(i, 2), 16);
		}*/
		//Or
		return ByteUtils.convertWordArrayToUint8Array(words);
	}




}
