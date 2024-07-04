import { throwError } from 'rxjs';

export class ByteUtils {


	public static readonly CHARACTERS_HEX: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];


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
			stringBuilder += ByteUtils.CHARACTERS_HEX[(bytes[i] >> 4) & 0x0f] + ByteUtils.CHARACTERS_HEX[bytes[i] & 0x0f];
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



	// OK
	public static uint8ArrayToHex(uint8Array: Uint8Array): string {
		var hex: string = "";
		for (var i = 0; i < uint8Array.length; i++) {
			hex += ByteUtils.CHARACTERS_HEX[uint8Array[i] >> 4] + ByteUtils.CHARACTERS_HEX[uint8Array[i] & 0x0F];
		}
		return hex;
	}


	public static convertWordArrayToUint8Array(wordArray: any): Uint8Array {
		var length: number = wordArray.words.length;
		var uint8Array: Uint8Array = new Uint8Array(length << 2);
		var offset: number = 0;
		var word: number;

		for (var i: number = 0; i < length; i++) {
			word = wordArray.words[i];
			uint8Array[offset++] = word >> 24;
			uint8Array[offset++] = (word >> 16) & 0xff;
			uint8Array[offset++] = (word >> 8) & 0xff;
			uint8Array[offset++] = word & 0xff;
		}
		return uint8Array;
	}

	//It's ok but Not work, because of prototype, object is not same as word array
	public static convertUint8ArrayToWordArray(uint8Array: Uint8Array): any {
		var words = [];
		var i: number = 0;
		var length: number = uint8Array.length;

		while (i < length) {
			words.push(
				(uint8Array[i++] << 24) |
				(uint8Array[i++] << 16) |
				(uint8Array[i++] << 8) |
				(uint8Array[i++])
			);
		}

		return {
			sigBytes: words.length * 4,
			words: words
		};
	}


	public static convertUint8ArrayToBinaryString(uint8Array: Uint8Array): string {
		var length = uint8Array.length;
		var b_str: string = "";
		for (var i: number = 0; i < length; i++) {
			b_str += String.fromCharCode(uint8Array[i]);
		}
		return b_str;
	}


	public static convertBinaryStringToUint8Array(binaryString: string): Uint8Array {
		var length: number = binaryString.length;
		var uint8Array: Uint8Array = new Uint8Array(length);
		for (var i = 0; i < length; i++) {
			uint8Array[i] = binaryString.charCodeAt(i);
		}
		return uint8Array;
	}




	public static async convertBlobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
		try {
			return await blob.arrayBuffer();
		} catch (e) {
			return new Promise<ArrayBuffer>((resolve) => {
				var fileReader: FileReader = new FileReader();
				fileReader.onload = (event) => {
					resolve(<ArrayBuffer>event.target.result); //Always return ArrayBuffer not string
				};
				fileReader.readAsArrayBuffer(blob); //Here we write read as ArrayBuffer
			});
		}
	}

	public static convertArrayBufferToBlob(arrayBuffer: ArrayBuffer): Blob {
		var uint8Array: Uint8Array = new Uint8Array(arrayBuffer);
		var arrayBufferLike: ArrayBufferLike = uint8Array.buffer;
		return new Blob([arrayBufferLike]);
	}

}


