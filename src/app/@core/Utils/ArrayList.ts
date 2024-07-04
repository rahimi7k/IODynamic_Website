
export class ArrayList<T> implements Iterable<T> {

	*[Symbol.iterator](): Iterator<T, any, undefined> {
		for (let key of this.list) {
			yield key;
		}
	}

	private list: T[] = [];

	public add(key: T): void {
		this.list.push(key);
	}

	public addInPosition(index: number, key: T): void {
		this.list.splice(index, 0, key);
	}

	public get(index: number): T {
		return this.list[index];
	}

	public getIndex(key: T): number {
		return this.list.indexOf(<any>key);
	}

	public remove(key: T): void {
		this.removeAtPosition(this.getIndex(key));
	}

	public removeAtPosition(index: number): void {
		this.list.splice(index, 1);
	}

	public length(): number {
		return this.list.length;
	}

	public clear(): void {
		this.list.splice(0, this.list.length);
	}

	public has(key: T): boolean {
		return this.list.indexOf(<any>key) !== -1;
	}


	public addAllArrayList(arrayList: ArrayList<T>): void {
		for (var i = 0; i < arrayList.length(); i++) {
			this.add(arrayList.get(i));
		}
	}

	public addAllArray(array: Array<T>): void {
		for (var key of array) {
			this.add(key);
		}
	}

	public addAllJavascriptArray(arrayList: any[]): void {
		for (var i = 0; i < arrayList.length; i++) {
			this.add(arrayList[i]);
		}
	}

	public isEmpty(): boolean {
		return this.list.length === 0;
	}

	public updateChanges(): void {
		this.list = [...this.list];
	}
}
