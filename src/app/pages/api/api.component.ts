import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Main } from 'app/main';

@Component({
	selector: 'app-api',
	templateUrl: './api.component.html',
	styleUrls: ['./api.component.scss'],
})
export class ApiComponent extends Main {


	public responseOrderMember: string = `{"status": "ok", "order_count": 75, "coin": 125.38}`;
	public responseGetCredit: string = `{"status": "ok", "coin": 65.4}`;
	public responseGetOrder: string = `{"status": "ok", "order_count": 75, "remaining": 65, error: null}`;
	public responseGetOrder_NotFound: string = `{"status": "ok", "error": "ORDER_NOT_FOUND"}`;
	public commentList: string = `["You look good today", "Greate", "Love You", "Best", "My best friend", "Fantastic", "Nice", "I like you", "Beautiful", "You are lovely"]`;
	public responseCancelOrder: string = `{"status": "ok", "coin": 65.4, "order_count": 75, "remaining": 65}`;




	constructor(private titleService: Title) {
		super();
	}


	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.Api_Page_Title);
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
	}





}

