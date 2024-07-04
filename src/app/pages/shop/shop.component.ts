import { Component, ElementRef, Renderer2, ViewChild, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ChangeDetectorRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Network } from '../../@core/Network';
import { StringUtils } from '../../@core/Utils/StringUtils';
import { PopUpComponent } from '../ui/popup/popup.component';
import { Setting } from '../setting/setting.service';
import { Main } from 'app/main';
import { Router } from '@angular/router';
import { Shop } from './shop.service';
import { ButtonComponent } from '../ui/button/button.component';
import { Color } from '../ui/color';
import { JSONObject } from 'app/@core/Utils/Json';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
})
export class ShopComponent extends Main {

	public coinList: Array<Shop.Package> = new Array<Shop.Package>();
	public isPackageLoaded: boolean = false;

	private buttons: ButtonComponent[]

	@ViewChild("Shop_PaymentButton_Free") buttonFree: ButtonComponent;
	@ViewChildren("Shop_PaymentButton") buttonsQueryList: QueryList<ButtonComponent>;
	@ViewChild('Shop_Dynamic_Container', { read: ViewContainerRef }) dynamicContainer: ViewContainerRef;



	constructor(private titleService: Title, private el: ElementRef, private render: Renderer2,
		private componentFactoryResolver: ComponentFactoryResolver,
		private viewContainerRef: ViewContainerRef,
		private cdref: ChangeDetectorRef,
		private router: Router,
		private zone: NgZone) {
		super();
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.titleService.setTitle(this.language.Shop_Page_Title);

	}


	ngAfterViewInit(): void {

		this.buttonsQueryList.changes.subscribe((value: QueryList<ButtonComponent>) => {

			this.buttonFree.setColor(Color.Color.Green);
			this.buttonFree.setOnClickListener(() => {
				this.showPopUp(1000);
			});

			this.buttons = value.toArray();
			for (let i: number = 0; i < this.buttons.length; i++) {
				this.buttons[i].setOnClickListener(() => {
					this.showPopUp(i);
				});
			}
		});


		this.clientsPrices();
		super.ngAfterViewInit();
	}


	ngOnDestroy(): void {
		super.ngOnDestroy();
	}




	public async showPopUp(number: number): Promise<void> {

		var packageItem: Shop.Package = this.coinList[number];

		var popup: PopUpComponent = await PopUpComponent.Factory.build(this.componentFactoryResolver, this.dynamicContainer, this.render);
		var popupContainer: HTMLElement = popup.getConatinerLayout();


		var container: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(container, 'className', 'popup-container payment');
		this.render.appendChild(popupContainer, container);


		var header: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(header, 'className', 'header');
		this.render.appendChild(container, header);

		var packageImg: HTMLImageElement = this.render.createElement("img");
		this.render.setProperty(packageImg, 'className', "packageImg");
		if (number === 1000) {
			this.render.setProperty(packageImg, 'src', "assets/images/bag-coin.png");
		} else {
			this.render.setProperty(packageImg, 'src', "assets/images/" + packageItem.image);
		}
		this.render.appendChild(header, packageImg);

		var titleMsg: HTMLParagraphElement = this.render.createElement("p");
		this.render.setProperty(titleMsg, 'innerHTML', number === 1000 ? this.language.Shop_Package_Free : this.language.Shop_Package + packageItem.id);
		this.render.appendChild(header, titleMsg);

		var hr: HTMLHRElement = this.render.createElement("hr");
		this.render.setProperty(hr, 'className', 'hr');
		this.render.appendChild(container, hr);


		var body: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(body, 'className', 'body');
		this.render.appendChild(container, body);


		/*
		var dropdownContainer = this.render.createElement("dropdown-container");
		this.render.appendChild(info, dropdownContainer);
		this.render.setProperty(dropdownContainer, 'className', 'form-group dropdown-container');

		var labelDropdown = this.render.createElement("label");
		this.render.appendChild(dropdownContainer, labelDropdown);
		this.render.setProperty(labelDropdown, 'className', 'label');
		this.render.setProperty(labelDropdown, 'for', "store_popup_dropdown");
		this.render.setProperty(labelDropdown, 'innerHTML', this.language.Store_PaymentMethod);

		var dropdown = this.render.createElement("dropdown");
		this.render.appendChild(dropdownContainer, dropdown);
		this.render.setProperty(dropdown, 'className', 'dropdown');

		var select = this.render.createElement("select");
		this.render.appendChild(dropdown, select);
		this.render.setProperty(select, 'className', 'form-control dropdown-select');
		this.render.setProperty(select, 'name', 'gateway-list');
		this.render.setProperty(select, 'size', 0);
		this.render.setAttribute(select, 'onfocus', 'if(this.options.length > 5){this.size = 5}');
		this.render.setAttribute(select, 'onblur', 'this.size=0;');
		this.render.setAttribute(select, 'onchange', 'this.size=1; this.blur();');
		this.render.listen(select, 'change', (event) => { this.onItemChange(event.target.value); });

		var payWith = this.render.createElement("div");
		this.render.appendChild(info, payWith);
		this.render.setProperty(payWith, 'className', 'payWith');

		var imgpayWith = this.render.createElement("img");
		this.render.appendChild(payWith, imgpayWith);
		this.render.setProperty(imgpayWith, 'src', 'assets/images/ic_cardbank.png');

		var labelpayWith = this.render.createElement("label");
		this.render.appendChild(payWith, labelpayWith);
		this.render.setProperty(labelpayWith, 'className', 'label');
		this.render.setProperty(labelpayWith, 'innerHTML', this.language.Store_GateWay);

		var gateWayText = this.render.createElement("p");
		this.render.appendChild(payWith, gateWayText);
		this.render.setProperty(gateWayText, "id", "Store_PopUp_TextPayWith");

		if (this.languageName === "en") {
			var option1 = this.render.createElement("option");
			this.render.appendChild(select, option1);
			this.render.setProperty(option1, 'value', 1);
			this.render.setProperty(option1, 'innerHTML', this.language.Store_PaymentMethod_PerfectMoney);

			var option2 = this.render.createElement("option");
			this.render.appendChild(select, option2);
			this.render.setProperty(option2, 'value', 2);
			this.render.setProperty(option2, 'innerHTML', this.language.Store_PaymentMethod_Payeer);


			if (this.gateWay === 1) {
				this.render.setProperty(gateWayText, 'innerHTML', this.language.Store_PaymentMethod_PerfectMoney);
				this.render.setProperty(option1, 'selected', "selected");
			} else {
				this.render.setProperty(gateWayText, 'innerHTML', this.language.Store_PaymentMethod_Payeer);
				this.render.setProperty(option2, 'selected', "selected");
			}

		} else {
			var option1 = this.render.createElement("option");
			this.render.appendChild(select, option1);
			this.render.setProperty(option1, 'value', 1);
			this.render.setProperty(option1, 'innerHTML', this.language.Store_GateWay + " " + this.language.Store_PaymentMethod_ZarinPal);

			var option2 = this.render.createElement("option");
			this.render.appendChild(select, option2);
			this.render.setProperty(option2, 'value', 2);
			this.render.setProperty(option2, 'innerHTML', this.language.Store_GateWay + " " + this.language.Store_PaymentMethod_IdPay);


			if (this.gateWay === 1) {
				this.render.setProperty(gateWayText, 'innerHTML', this.language.Store_PaymentMethod_ZarinPal);
				this.render.setProperty(option1, 'selected', "selected");
			} else {
				this.render.setProperty(gateWayText, 'innerHTML', this.language.Store_PaymentMethod_IdPay);
				this.render.setProperty(option2, 'selected', "selected");
			}

		}
		*/

		var lines: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(lines, 'className', 'lines');
		this.render.appendChild(body, lines);

		var count: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(count, 'className', 'line');
		this.render.appendChild(lines, count);

		var imgCount: HTMLImageElement = this.render.createElement("img");
		this.render.setProperty(imgCount, 'src', 'assets/images/ic_coin.png');
		this.render.appendChild(count, imgCount);

		var labelCount: HTMLLabelElement = this.render.createElement("label");
		this.render.setProperty(labelCount, 'className', 'label');
		this.render.setProperty(labelCount, 'innerHTML', this.language.Shop_Coin);
		this.render.appendChild(count, labelCount);

		var textCount: HTMLParagraphElement = this.render.createElement("p");
		this.render.setProperty(textCount, 'innerHTML', number === 1000 ? this.language.Shop_Package_Free_Credit : this.coinList[number].stringCoin);
		this.render.appendChild(count, textCount);



		var price: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(price, 'className', 'line');
		this.render.appendChild(lines, price);

		var imgCount: HTMLImageElement = this.render.createElement("img");
		this.render.setProperty(imgCount, 'src', 'assets/images/ic_dollar.png');
		this.render.appendChild(price, imgCount);

		var labelPrice: HTMLLabelElement = this.render.createElement("label");
		this.render.setProperty(labelPrice, 'className', 'label');
		this.render.setProperty(labelPrice, 'innerHTML', this.language.Shop_Price);
		this.render.appendChild(price, labelPrice);

		var textPrice: HTMLParagraphElement = this.render.createElement("p");
		this.render.setProperty(textPrice, 'innerHTML', number === 1000 ? this.language.Shop_Package_Free_Price : this.coinList[number].stringPrice + " " + this.language.Shop_Value);
		this.render.appendChild(price, textPrice);


		var description: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(description, 'className', 'line');
		this.render.appendChild(lines, description);

		var imgdDescription: HTMLImageElement = this.render.createElement("img");
		this.render.setProperty(imgdDescription, 'src', 'assets/svg/info.svg');
		this.render.appendChild(description, imgdDescription);

		var labelDescription: HTMLLabelElement = this.render.createElement("label");
		this.render.setProperty(labelDescription, 'className', 'label');
		this.render.setProperty(labelDescription, 'innerHTML', this.language.Description);
		this.render.appendChild(description, labelDescription);

		var textDescription: HTMLParagraphElement = this.render.createElement("p");
		if (number === 1000) {
			this.render.setProperty(textDescription, 'innerHTML', this.language.Shop_Package_Free_Explain_Msg);
		} else {
			this.render.setProperty(textDescription, 'innerHTML', this.language.Shop_PopUp_Description);
		}
		this.render.appendChild(description, textDescription);



		var btnContainer: HTMLDivElement = this.render.createElement("div");
		this.render.setProperty(btnContainer, 'className', 'btn-container');
		this.render.appendChild(body, btnContainer);

		var btnRef: ComponentRef<ButtonComponent> = await ButtonComponent.Factory.build(popup.componentFactoryResolver, popup.viewContainerRef, popup.render, btnContainer);
		var btnComponent: ButtonComponent = btnRef.instance;
		btnComponent.text = this.language.Shop_PopUp_Login_Button;
		btnComponent.setOnClickListener(() => {
			window.location.href = "https://followergir.iodynamic.com";

		});

		popup.setOnCloseListener(() => {
			btnRef.destroy();
		});

		popup.show();
	}




	private async clientsPrices() {

		this.coinList.splice(0, this.coinList.length);

		var req: Map<string, string> = new Map<string, string>();
		if (Setting.getLanguage() === "fa") {
			req.set("country_code", "IR");
		} else {
			req.set("country_code", "EN");
		}
		var res: JSON = await Network.requestPost("https://store.iodynamic.com/web/get_packages", req, null, "json");
		console.log(res);

		var json: JSONObject = new JSONObject(res);

		var rateConfig: Shop.RateConfig;
		try {
			var rateConfig: Shop.RateConfig = JSONObject.ConvertJsonToClass<Shop.RateConfig>(json.getJSONObject("rate"), Shop.RateConfig);
		} catch (e) {
			rateConfig.user = 0;
			rateConfig.like = 0;
			rateConfig.comment = 0;
		}
		console.log(rateConfig);
		var keys: string[] = json.getJSONObject("packages").keys();
		var index: number = 0;
		var fixNumber: number = 0;
		if (Setting.getLanguage() === "en") {
			fixNumber = 2;
		}
		for (var key of keys) {
			let storePackage: Shop.Package = new Shop.Package();
			storePackage.id = key;
			storePackage.coin = json.getJSONObject("packages").getJSONObject(key).getNumber("coin");
			storePackage.price = json.getJSONObject("packages").getJSONObject(key).getNumber("price");
			storePackage.stringCoin = StringUtils.onDigitGrouping(storePackage.coin);
			storePackage.stringPrice = StringUtils.onDigitGrouping(storePackage.price);
			storePackage.oneKPriceUser = StringUtils.onDigitGrouping((storePackage.price / (storePackage.coin / (2 * rateConfig.user)) * 1000).toFixed(fixNumber));
			storePackage.oneKPriceLike = StringUtils.onDigitGrouping((storePackage.price / (storePackage.coin / (2 * rateConfig.like)) * 1000).toFixed(fixNumber));
			storePackage.oneKPriceComment = StringUtils.onDigitGrouping((storePackage.price / (storePackage.coin / (2 * rateConfig.comment)) * 1000).toFixed(fixNumber));
			storePackage.image = "ic_store_package" + (index + 1) + ".png";
			this.coinList.push(storePackage);

			index++;
		}

		this.isPackageLoaded = true;
	}




}

