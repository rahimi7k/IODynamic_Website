import { Injectable } from '@angular/core';
import { Network } from './Network';
import { IndexDB } from './IndexDB/IndexDB';
import { ByteUtils } from './Utils/byte_utils';

@Injectable({
	providedIn: 'root',
})
export class ManageData {

	private static readonly indexDb = new IndexDB();
	private static readonly indexDbName = "FILES";
	public static files: Map<string, string> = new Map<string, string>();

	public static async tempDownload(filePath: string): Promise<string> {
		var blob: Blob = await Network.requestGet(filePath, null, null, "blob");
		if (blob != null && blob.size > 0) {
			let url = (window.URL || window.webkitURL).createObjectURL(blob);
			return url;
		} else {
			return null;
		}
	}

	public static async download(filePath: string): Promise<string> {
		return new Promise<string>(async (resolve) => {
			var urlList: string = ManageData.files.get(filePath);
			if (urlList != null) {
				resolve(urlList);
			}

			var data: Uint8Array = await ManageData.indexDb.get(ManageData.indexDbName, filePath);
			if (data == null || data.length === 0) {
				var blob: Blob = await Network.requestGet(filePath, null, null, "blob");
				if (blob != null && blob.size > 0) {
					var buffer: ArrayBuffer = await ByteUtils.convertBlobToArrayBuffer(blob);
					var uint8Array: Uint8Array = new Uint8Array(buffer);
					await ManageData.indexDb.set(ManageData.indexDbName, filePath, uint8Array);
					let url = (window.URL || window.webkitURL).createObjectURL(blob);
					ManageData.files.set(filePath, url);
					resolve(url);
				} else {
					console.warn('404 - blob not found!');
					resolve("");
				}
			} else {
				// var blob = new Blob([f[0]["FileData"]], { type: 'image/png' });
				let url = (window.URL || window.webkitURL).createObjectURL(new Blob([data]));
				ManageData.files.set(filePath, url);
				resolve(url);
			}
		});
	}


	public static async downloadAsync(filePath: string, requestDelegate: (result: string) => void): Promise<void> {

		var urlList: string = ManageData.files.get(filePath);
		if (urlList != null) {
			if (requestDelegate != null) {
				requestDelegate(urlList);
			}
		}

		var data: Uint8Array = await ManageData.indexDb.get(ManageData.indexDbName, filePath);
		if (data == null || data.length === 0) {
			var blob: Blob = await Network.requestGet(filePath, null, null, "blob");
			if (blob != null && blob.size > 0) {
				var buffer = await ByteUtils.convertBlobToArrayBuffer(blob);
				var uint8Array: Uint8Array = new Uint8Array(buffer);
				await ManageData.indexDb.set(ManageData.indexDbName, filePath, uint8Array);
				let url = (window.URL || window.webkitURL).createObjectURL(blob);
				ManageData.files.set(filePath, url);
				if (requestDelegate != null) {
					requestDelegate(url);
				}
			} else {
				console.warn('404 - blob not found!');
				if (requestDelegate != null) {
					requestDelegate("");
				}
			}
		} else {
			// var blob = new Blob([f[0]["FileData"]], { type: 'image/png' });
			let url = (window.URL || window.webkitURL).createObjectURL(new Blob([data]));
			ManageData.files.set(filePath, url);
			if (requestDelegate != null) {
				requestDelegate(url);
			}
		}

	}



	// Not Used Because of files's List
	public static releaseUrl(url: string): void {
		// URL.revokeObjectURL(url);
	}


	public static async flush(): Promise<void> {
		ManageData.indexDb.flush(ManageData.indexDbName);
	}

}
