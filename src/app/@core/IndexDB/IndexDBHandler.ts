import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IndexDBHandler {

	public static readonly DATABASE_NAME: string = "App";
	public static readonly DATABASE_VERSION: number = 2;

	public static readonly TABLE_API_FILES: string = "Api_Files";


	private static database: IDBDatabase = null;


	public static async init(): Promise<void> {

		return new Promise(async resolve => {

			var iDBOpenDBRequest: IDBOpenDBRequest = window.indexedDB.open(IndexDBHandler.DATABASE_NAME, IndexDBHandler.DATABASE_VERSION);
			iDBOpenDBRequest.onsuccess = function (event) {
				IndexDBHandler.database = this.result;
				resolve(); // First onUpgrade Excute, Then onSucess Execute
			};

			iDBOpenDBRequest.onerror = function (event) {
				throw new Error("Database: " + this.error);
			};

			iDBOpenDBRequest.onupgradeneeded = async function (e) {
				let database: IDBDatabase = this.result;
				await IndexDBHandler.onUpdate(database, e.oldVersion, e.newVersion);
			};

		});


	}

	public static async onUpdate(database: IDBDatabase, oldVersion: number, newVersion: number): Promise<void> {

		if (oldVersion < 1) {
			database.createObjectStore("FILE_DATA");
			database.createObjectStore("FILES");
			database.createObjectStore(IndexDBHandler.TABLE_API_FILES);
		}

		if (oldVersion < 2) {
		}
	}


	public static getDatabase(): IDBDatabase {
		return IndexDBHandler.database;
	}


	public static setDatabase(database): void {
		IndexDBHandler.database = database;
	}

}
