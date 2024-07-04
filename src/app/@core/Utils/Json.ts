
export class JSONObject {

	private json: JSON;

	constructor();
	constructor(json: string);
	constructor(json: JSON);
	constructor(json?: string | JSON) {
		if (json == null) {
			this.json = JSON.parse("{}");
		} else if (typeof json === 'string') {
			this.json = JSON.parse(<string>json);
		} else  {
			this.json = json;
		}
	}

	public toString(): string {
		return JSON.stringify(this.json);
	}

	public get(): JSON {
		return this.json;
	}

	public getJSONObject(key: string): JSONObject {
		return new JSONObject(this.json[key]);
	}

	public getJSONArray(key: string): JSONArray {
		return new JSONArray(this.json[key]);
	}

	public put(key: string, value: string): void;
	public put(key: string, value: number): void;
	public put(key: string, value: boolean): void;
	public put(key: string, value: bigint): void;
	public put(key: string, value: JSONObject): void;
	public put(key: string, value: JSONArray): void;
	public put(key: string, value: object): void;
	public put(key: string, value: any) {
		if (typeof (value) === 'number') {
			this.json[key] = <number>value;
		} else if (typeof (value) === 'string') {
			this.json[key] = <string>value;
		} else if (typeof (value) === 'boolean') {
			this.json[key] = <boolean>value;
		} else if (typeof (value) === 'bigint') {
			this.json[key] = <bigint>value;
		} else if (value instanceof JSONObject) {
			this.json[key] = value.get();
		} else if (value instanceof JSONArray) {
			this.json[key] = value.get();
		} else if (typeof (value) === 'object') {
			this.json[key] = <object>value;
		} else {
			this.json[key] = value;
		}
	}


	public getBoolean(key: string): boolean {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return <boolean>this.json[key];
	}

	public getString(key: string): string {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return <string>this.json[key];
	}

	public getNumber(key: string): number {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return <number>this.json[key];
	}

	public getBigInt(key: string): bigint {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return <bigint>this.json[key];
	}

	public getObject(key: string): Object {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return <Object>this.json[key];
	}

	public getAny(key: string): any {
		if (this.isNull(key)) {
			throw new Error("JSON Value for key: [" + key + "] is null");
		}
		return this.json[key];
	}

	public length(): number {
		return Object.keys(this.json).length;
	}

	public keys(): string[] {
		return Object.keys(this.json);
	}

	public isNull(key: string): boolean {
		return this.json[key] == null;
	}

	public remove(key: string): boolean {
		let res: boolean = delete this.json[key];
		return res;
	}


	public static ConvertJsonToClass<T>(json: JSONObject, TCreator: { new(): T; }): T {
		var newClass: T = Object.assign<T, JSON>(new TCreator(), json.get());
		newClass = Object.setPrototypeOf(newClass, TCreator.prototype);
		return newClass
	}



}

export class JSONArray {

	private json: JSON;

	constructor();
	constructor(json: string);
	constructor(json: JSON);
	constructor(json?: string | JSON) {
		if (json == null) {
			this.json = JSON.parse("[]");
		} else if (typeof json === 'string') {
			this.json = JSON.parse(<string>json);
		} else {
			this.json = json;
		}
	}

	public toString(): string {
		return JSON.stringify(this.json);
	}

	public get(): JSON {
		return this.json;
	}

	public put(value: string): void;
	public put(value: number): void;
	public put(value: boolean): void;
	public put(value: bigint): void;
	public put(value: JSONObject): void;
	public put(value: JSONArray): void;
	public put(value: object): void;
	public put(value: any) {
		if (typeof (value) === 'number') {
			this.json[this.length()] = <number>value;
		} else if (typeof (value) === 'string') {
			this.json[this.length()] = <string>value;
		} else if (typeof (value) === 'boolean') {
			this.json[this.length()] = <boolean>value;
		} else if (typeof (value) === 'bigint') {
			this.json[this.length()] = <bigint>value;
		} else if (value instanceof JSONObject) {
			this.json[this.length()] = value.get();
		} else if (value instanceof JSONArray) {
			this.json[this.length()] = value.get();
		} else if (typeof (value) === 'object') {
			this.json[this.length()] = <object>value;
		} else {
			this.json[this.length()] = value;
		}
	}


	public getJSONObject(index: number): JSONObject {
		return new JSONObject(this.json[index]);
	}

	public getJSONArray(index: number): JSONArray {
		return new JSONArray(this.json[index]);
	}

	public getBoolean(index: number): boolean {
		if (this.isNull(index)) {
			throw new Error("JSON Value for index: [" + index + "] is null");
		}
		return <boolean>this.json[index];
	}

	public getString(index: number): string {
		if (this.isNull(index)) {
			throw new Error("JSON Value for index: [" + index + "] is null");
		}
		return <string>this.json[index];
	}

	public getNumber(index: number): number {
		if (this.isNull(index)) {
			throw new Error("JSON Value for index: [" + index + "] is null");
		}
		return <number>this.json[index];
	}

	public getBigInt(index: number): bigint {
		if (this.isNull(index)) {
			throw new Error("JSON Value for index: [" + index + "] is null");
		}
		return <bigint>this.json[index];
	}

	public getObject(index: number): Object {
		if (this.isNull(index)) {
			throw new Error("JSON Value for key: [" + index + "] is null");
		}
		return <Object>this.json[index];
	}

	public length(): number {
		return Object.keys(this.json).length;
	}

	public keys(): string[] {
		return Object.keys(this.json);
	}

	public isNull(index: number): boolean {
		return this.json[index] == null;
	}

	public remove(index: number): boolean {
		let res: boolean = delete this.json[index];
		return res;
	}

}