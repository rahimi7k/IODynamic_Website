import { JSONObject } from './Json';
import { StringUtils } from './StringUtils';

export class StorageUtils {

	public static readonly App: string = "app";
	public static readonly Message: string = "message";
	public static readonly Setting: string = "setting";
	public static readonly System: string = "system";



	public static set(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	public static get(key: string, defaultValue?: string): string {
		var value = localStorage.getItem(key);
		if (value == null) {
			return defaultValue;
		}
		return value;
	}



	private static getValue(storageName: string, property: string): any {
		var storage: string = StorageUtils.get(storageName);
		if (StringUtils.isEmpty(storage)) {
			return null;
		}
		var js: JSON;
		try {
			js = JSON.parse(storage);
			return js[property];
		} catch (e) {
			console.error(e);
			return null;
		}
	}


	public static getNumber(storageName: string, property: string, defaultValue: number): number {
		var v: any = StorageUtils.getValue(storageName, property);
		if (v == null) {
			return defaultValue;
		}
		if (typeof v === "number" || v instanceof Number) {
			return <number>v;
		}
		throw new Error("Format is not <number>!");
	}

	public static getString(storageName: string, property: string, defaultValue: string): string {
		var v: any = StorageUtils.getValue(storageName, property);
		if (v == null) {
			return defaultValue;
		}
		if (typeof v === "string" || v instanceof String) {
			return <string>v;
		}
		return null;
	}

	public static getBoolean(storageName: string, property: string, defaultValue: boolean): boolean {
		var v: any = StorageUtils.getValue(storageName, property);
		if (v == null) {
			return defaultValue;
		}
		if (typeof v === "boolean" || v instanceof Boolean) {
			return <boolean>v;
		}
		throw new Error("Format is not <boolean>!");
	}

	public static getBigInt(storageName: string, property: string, defaultValue: bigint): bigint {
		var v: any = StorageUtils.getValue(storageName, property);
		if (v == null) {
			return defaultValue;
		}
		if (typeof v === "bigint" || v instanceof BigInt) {
			return <bigint>v;
		}
		throw new Error("Format is not <bigint>!");
	}



	public static put(storageName: string, property: string, value: any): void {
		var storage: string = StorageUtils.get(storageName);
		var json: JSONObject;
		try {
			if (!StringUtils.isEmpty(storage)) {
				json = new JSONObject(storage);
			} else {
				json = new JSONObject();
			}
		} catch (ex) {
			console.warn(storageName + " storage json had problem and removed!");
			json = new JSONObject();
		}
		json.put(property, value);
		StorageUtils.set(storageName, json.toString());
	}

	public static remove(storageName: string, property: string): void {
		var storage: string = StorageUtils.get(storageName);
		var json: JSONObject;
		try {
			if (!StringUtils.isEmpty(storage)) {
				json = new JSONObject(storage);
			} else {
				json = new JSONObject();
			}
		} catch (ex) {
			console.warn(storageName + " storage json has a problem and removed!");
			json = new JSONObject();
		}
		json.remove(property);
		StorageUtils.set(storageName, json.toString());
	}





}


