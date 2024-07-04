import { Injectable } from '@angular/core';
import { StringUtils } from './Utils/StringUtils';
import { Thread } from './Thread/Thread';
import { App } from '../../app/app.service';


export class Network {


	private static readonly TIMEOUT: number = 12000;
	// private static readonly listUrls: Map<string, boolean> = new Map<string, string>();

	public static isConnected(): boolean {
		return window.navigator.onLine;
	}

	/*
	this.getRepos().subscribe(
		response => {
			console.log("response", response);
		},
	);

	getRepos(): Observable < any > {
		var obs: Observable<any> = this.httpClient.get("http://localhost:5000/home/test", { headers: { 'User-Agent': 'Microks/5.0' }, responseType: "text" });
		return obs;
	}
	*/





	public static requestGet(url: string, params: Map<string, string>, headers?: Map<string, string>, responseType?: string, timeout?: number): Promise<any> {
		return new Promise<any>((resolve): void => {

			var reqTimeout = timeout == null || timeout === 0 ? Network.TIMEOUT : timeout;

			if (typeof Worker !== 'undefined') {
				var thread: Thread = Network.threadRequest();
				thread.onResult((response) => {
					thread.close();
					resolve(response);
				});
				thread.run({ url: url, method: "GET", params: params, headers: headers, responseType: responseType, origin: window.location.origin, timeout: reqTimeout, isProd: App.isProd });
				return;
			}

			let xhttp = new XMLHttpRequest();
			xhttp.open('GET', url + Network.paramsConvert(params, true), true);

			// xhttp.setRequestHeader("User-Agent", null);
			if (headers != null) {
				headers.forEach((value: string, key: string) => {
					xhttp.setRequestHeader(key, value);
				});
			}


			if (responseType != null && responseType !== "") {
				responseType = responseType.toLowerCase();
				if (responseType === "blob") {
					xhttp.responseType = "blob";
				} else if (responseType === "arraybuffer") {
					xhttp.responseType = "arraybuffer";
				} else if (responseType === "json") {
					xhttp.responseType = "json";
				} else if (responseType === "document") {
					xhttp.responseType = "document";
				} else {
					xhttp.responseType = "text";
				}
			}
			xhttp.timeout = reqTimeout;
			xhttp.onreadystatechange = () => {
					/*else if (xhttp.status === 0) { // When SSL not work status is 0
						if (url.startsWith("https")) {
							xhttp.open('GET', "http" + url.slice(5), true);
							xhttp.onreadystatechange = () => {
								if (xhttp.readyState === 4) {
									if (xhttp.status >= 200 && xhttp.status <= 399) {
										resolve(xhttp.response);

									} else if (xhttp.status >= 400 && xhttp.status <= 599) {
										resolve(null);
									}
								}
							};
							xhttp.ontimeout = () => {
								resolve(null);
							};
							xhttp.send();
						} else { // error Unknown, server is not accessable
							resolve(null);
						}
					}*/
			};

			xhttp.onloadend = () => {
				if (xhttp.readyState === xhttp.DONE) { // xhttp.DONE is 4

					if (xhttp.status >= 200 && xhttp.status <= 399) {
						resolve(xhttp.response);

					} else if (xhttp.status === 0 || xhttp.status >= 400 && xhttp.status <= 599) {
						resolve(null);

					}
				}
			};


			xhttp.ontimeout = () => {
				resolve(null);
			};
			xhttp.send();
		});
	}




	public static requestPost(url: string, params: /*Map<string, string>*/ any, headers?: Map<string, string>, responseType?: string, requestType?: string, timeout?: number): Promise<any> {
		return new Promise<string>((resolve): void => {

			var reqTimeout = timeout == null || timeout === 0 ? Network.TIMEOUT : timeout;

			if (typeof Worker !== 'undefined') {

				var thread: Thread = Network.threadRequest();
				thread.onResult((response) => {
					thread.close();
					resolve(response);
				});
				thread.run({ url: url, method: "POST", params: params, headers: headers, responseType: responseType, requestType: requestType, origin: window.location.origin, timeout: reqTimeout, isProd: App.isProd });
				return;
			}

			var xhttp: XMLHttpRequest = new XMLHttpRequest();
			xhttp.open('POST', url, true);

			if (headers != null) {
				headers.forEach((value: string, key: string) => {
					xhttp.setRequestHeader(key, value);
				});
			}

			if (headers == null || !headers.has("Content-Type")) {
				if (requestType === "json") {
					xhttp.setRequestHeader("Content-Type", "application/json");
				} else {
					xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
				}
			}

			if (responseType != null && responseType !== "") {
				responseType = responseType.toLowerCase();
				if (responseType === "blob") {
					xhttp.responseType = "blob";
				} else if (responseType === "arraybuffer") {
					xhttp.responseType = "arraybuffer";
				} else if (responseType === "json") {
					xhttp.responseType = "json";
				} else if (responseType === "document") {
					xhttp.responseType = "document";
				} else {
					xhttp.responseType = "text";
				}
			}

			xhttp.timeout = reqTimeout;
			xhttp.onreadystatechange = () => {
			};

			xhttp.onloadend = () => {
				if (xhttp.readyState === xhttp.DONE) {

					if (xhttp.status >= 200 && xhttp.status <= 399) {
						resolve(xhttp.response);

					} else if (xhttp.status === 0 || xhttp.status >= 400 && xhttp.status <= 599) {
						resolve(null);

					}
				}
			};


			xhttp.ontimeout = () => {
				resolve(null);
			};
			if (requestType === "json") {
				xhttp.send(params);
			} else {
				var postParams2 = Network.paramsConvert(params, false);
				if (postParams2 === "") {
					xhttp.send();
				} else {
					xhttp.send(postParams2);
				}
			}
		});
	}

	private static arrayBufferToUint8Array(arrayBuffer: ArrayBuffer): Uint8Array {
		var uint8Array = new Uint8Array(arrayBuffer);
		var bytes: string = "";
		for (var i = 0; i < uint8Array.length; i++) {
			bytes += StringUtils.CHARACTERS_HEX[uint8Array[i] >> 4] + StringUtils.CHARACTERS_HEX[uint8Array[i] & 0x0F];
		}
		return uint8Array;
	}



	public static paramsConvert(params: Map<string, string>, appendQuestionMark: boolean): string {
		if (params == null || params.size === 0) {
			return "";
		}

		var string: string = "";
		params.forEach((value: string, key: string) => {
			try {
				string += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
			} catch { }
		});
		string = string.slice(0, string.length - 1);
		return string.length === 0 ? "" : (appendQuestionMark ? '?' + string : string);
	}





	private static threadRequest(): Thread {
		return new Thread(() => {

			// response come to onmessage, onmessage in Thread send res to our function onResult
			// @ts-ignore
			this.onmessage = (event) => {
				// here is thread function

				if (!event.data.url.includes("http://") && !event.data.url.includes("https://")) {
					event.data.url = event.data.origin + "/" + event.data.url;
				}

				var xhttp: XMLHttpRequest = new XMLHttpRequest();

				console.log(event.data.url);

				if (event.data.method === "GET") {
					event.data.url += paramsConvert(event.data.params as Map<string, string>, true);

					xhttp.open(event.data.method, event.data.url, true);

					if (event.data.headers != null) {
						event.data.headers.forEach((value: string, key: string) => {
							xhttp.setRequestHeader(key, value);
						});
					}

				} if (event.data.method === "POST") {

					xhttp.open(event.data.method, event.data.url, true);

					if (event.data.headers != null) {
						event.data.headers.forEach((value: string, key: string) => {
							xhttp.setRequestHeader(key, value);
						});
					}

					if (event.data.headers == null || !(event.data.headers as Map<string, string>).has("Content-Type")) {
						if (event.data.requestType === "json") {
							xhttp.setRequestHeader("Content-Type", "application/json");
						} else {
							xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
						}
					}
				}


				if (event.data.responseType != null && event.data.responseType !== "") {
					event.data.responseType = event.data.responseType.toLowerCase();
					if (event.data.responseType === "blob") {
						xhttp.responseType = "blob";
					} else if (event.data.responseType === "arraybuffer") {
						xhttp.responseType = "arraybuffer";
					} else if (event.data.responseType === "json") {
						xhttp.responseType = "json";
					} else if (event.data.responseType === "document") {
						xhttp.responseType = "document";
					} else {
						xhttp.responseType = "text";
					}
				}

				xhttp.timeout = event.data.timeout;

				xhttp.onreadystatechange = () => {
				};


				xhttp.onloadend = () => {

					if (xhttp.readyState === xhttp.DONE) {

						if (xhttp.status >= 200 && xhttp.status <= 399) {
							// @ts-ignore
							this.postMessage(xhttp.response);

						} else if (xhttp.status === 0 || xhttp.status >= 400 && xhttp.status <= 599) {
							// @ts-ignore
							this.postMessage(null);

						}
					}
				};

				xhttp.ontimeout = () => {
					// @ts-ignore
					this.postMessage(null);
				};

				if (event.data.method === "GET") {
					xhttp.send();
				} else if (event.data.method === "POST") {
					if (event.data.requestType === "json") {
						xhttp.send(event.data.params);
					} else {
						xhttp.send(paramsConvert(event.data.params, false));
					}

				}
			};


			function paramsConvert(params, appendQuestionMark) {
				if (params == null || params.size === 0) {
					return "";
				}
				var string = "";
				params.forEach((value, key) => {
					try {
						string += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
					} catch { }
				});
				string = string.slice(0, string.length - 1);
				return string.length === 0 ? "" : (appendQuestionMark ? '?' + string : string);
			}

		});

	}






	public static requestPostByte(url: string, uint8Array: Uint8Array, headers?: Map<string, string>): Promise<Uint8Array> {
		return new Promise<Uint8Array>((resolve): void => {
			/*
			if (typeof Worker !== 'undefined') {
			  var thread: Thread = Network.threadRequestStream();
			  thread.onResult((response) => {
				thread.close();
				resolve(Network.arrayBufferToUint8Array(response));
			  });
			  thread.run({ url: url, uint8Array: uint8Array, headers: headers });
			  return;
			}
			*/

			let xhttp = new XMLHttpRequest();
			xhttp.open('POST', url, true);
			xhttp.setRequestHeader("Content-Type", "application/octet-stream");
			// xhttp.setRequestHeader("User-Agent", null);
			xhttp.responseType = "arraybuffer";
			xhttp.overrideMimeType("application/octet-stream");
			if (headers != null) {
				headers.forEach((value: string, key: string) => {
					xhttp.setRequestHeader(key, value);
				});
			}
			xhttp.timeout = Network.TIMEOUT;
			xhttp.onreadystatechange = () => {
				if (xhttp.readyState === 4) {
					if (xhttp.status >= 200 && xhttp.status <= 399) {
						resolve(Network.arrayBufferToUint8Array(xhttp.response));

					} else if (xhttp.status === 0 && xhttp.status >= 400 && xhttp.status <= 599) {
						resolve(null);

					}

				} else {
					resolve(null);
				}
			};
			xhttp.ontimeout = () => {
				resolve(null);
			};

			if (uint8Array == null) {
				xhttp.send();
			} else {
				xhttp.send(uint8Array);
			}
		});
	}


	private static threadRequestStream(): Thread {
		return new Thread(() => {

			// response come to onmessage, onmessage in Thread send res to our function onResult
			// @ts-ignore
			this.onmessage = (event) => {
				// here is thread function

				let xhttp = new XMLHttpRequest();
				xhttp.open('POST', event.data.url, true);
				xhttp.setRequestHeader("Content-Type", "application/octet-stream");
				// xhttp.setRequestHeader("User-Agent", null);
				xhttp.responseType = "arraybuffer";
				xhttp.overrideMimeType("application/octet-stream");
				if (event.data.headers != null) {
					event.data.headers.forEach((value: string, key: string) => {
						xhttp.setRequestHeader(key, value);
					});
				}
				xhttp.timeout = 10000;
				xhttp.onreadystatechange = () => {
					if (xhttp.readyState === 4) {
						if (xhttp.status >= 200 && xhttp.status <= 399) {
							// @ts-ignore
							this.postMessage(xhttp.response);

						} else if (xhttp.status >= 400 && xhttp.status <= 599) {
							// @ts-ignore
							this.postMessage(null);

						}
					}
				};
				xhttp.ontimeout = () => {
					// @ts-ignore
					this.postMessage(null);
				};

				if (event.data.uint8Array == null) {
					xhttp.send();
				} else {
					xhttp.send(event.data.uint8Array);
				}


			};
		});

	}




	public static setCookie(name, value, days): void {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}

	public static getCookie(name): string {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
		}
		return null;
	}

	public static removeCookie(name): void {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}



}
