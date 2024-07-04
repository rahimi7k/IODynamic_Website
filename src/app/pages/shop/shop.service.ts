import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Shop {


}


export namespace Shop {

	export class Package {
		public id: string;
		public coin: number;
		public price: number;
		public stringCoin: string;
		public stringPrice: string;
		public oneKPriceUser: string;
		public oneKPriceLike: string;
		public oneKPriceComment: string;
		public image: string;
	}


	export enum Status {
		Cancelled = 0,
		Done = 1,
		AlreadyDone = 2,
		Error = 3,
		Failed = 4,
		WaitingForApproval = 5,
		MoneyBacked = 6,
		PayedLess = 7,
		Unknown = 8,
	};

	export class RateConfig {
		public user: number;
		public like: number;
		public comment: number;
	}


}
