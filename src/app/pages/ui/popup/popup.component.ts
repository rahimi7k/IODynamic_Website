import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, Renderer2, ViewContainerRef, ComponentRef, NgZone, ChangeDetectorRef, ComponentFactoryResolver, Injector, NgModuleRef, ComponentFactory } from '@angular/core';
import { ManageData } from '../../../@core/ManageData';
import { Setting } from 'app/pages/setting/setting.service';
import { map, filter, startWith, take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { StringUtils } from '../../../@core/Utils/StringUtils';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
})
export class PopUpComponent implements OnInit, OnDestroy, AfterViewInit {

	public direction: string;
	public componentId: string;
	private isCancelable: boolean = true;

	private popup: HTMLDivElement;
	private popupCenter: HTMLDivElement;
	private popupHeader: HTMLDivElement;
	private popupHeaderCloseImage: HTMLImageElement;
	private popupBody: HTMLDivElement;
	protected popupContainer: HTMLDivElement;

	private componentRef: ComponentRef<PopUpComponent>;

	private closeDelegate;
	private openDelegate;

	constructor(public render: Renderer2,
		private zone: NgZone,
		private cdref: ChangeDetectorRef,
		public viewContainerRef: ViewContainerRef,
		public componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit(): void {
		this.zone.run(() => {
			this.componentId = StringUtils.generateUniqueId();
			this.direction = Setting.getDirection();
		});
	}

	ngAfterViewInit(): void {

		this.zone.run(() => {
			this.popupContainer = <HTMLDivElement>document.getElementById("PopUp_Container_" + this.componentId);
			this.popup = <HTMLDivElement>document.getElementById("PopUp_" + this.componentId);
			this.popupCenter = <HTMLDivElement>document.getElementById("PopUp_Center_" + this.componentId);
			this.popupHeader = <HTMLDivElement>document.getElementById("PopUp_Header_" + this.componentId);
			this.popupHeaderCloseImage = <HTMLImageElement>document.getElementById("PopUp_Header_Close_Img_" + this.componentId);
			this.popupBody = <HTMLDivElement>document.getElementById("PopUp_Body_" + this.componentId);
		});
	}

	ngOnDestroy(): void {
	}

	public async initializeLayouts(): Promise<HTMLElement> {

		return new Promise<HTMLElement>((resolve): void => {
			interval(50).pipe(
				startWith(0),
				// map(() => {}),
				filter((res): boolean => {
					return this.popupContainer != null;
				}),
				take(1),
				//tap(res => {
				//	We can also use here
				//})
			).subscribe(() => {
				resolve(this.popup.parentElement);
			});
		});
	}


	public getBodyLayout(): HTMLElement {
		return this.popupBody;
	}


	public getConatinerLayout(): HTMLElement {
		return this.popupContainer;
	}


	/*
	@HostListener('document:click', ['$event'])
	clickout(event) {
	  if (this.eRef.nativeElement.contains(event.target)) {
		// console.log("clicked inside");
	  } else {
		// console.log("clicked outside");
	  }
	}
	*/

	/*
	@HostListener('window:click', ['$event']) onCilickOutSide(event) {
	  var isCloseForDialog: boolean = false;
	  var dialog = document.getElementById("dialog");
	  if (dialog != null) {
		var dialogVisibility = dialog.style.visibility;
		var dialogBody = document.getElementById("dialog_body");
		var dialogHeader = document.getElementById("dialog_header");
		isCloseForDialog = dialogBody.contains(event.target) || dialogHeader.contains(event.target) || dialogVisibility === "visible" ? true : false;
	  }
	  if (!document.getElementById('PopUp_Body').contains(event.target) &&
		!document.getElementById('PopUp_Header').contains(event.target) &&
		event.target.localName.toLowerCase() !== "button" &&
		!isCloseForDialog) {
		if (this.popUpVisibility) {
		  if (!this.isFirstClickOnClose) {
			this.isFirstClickOnClose = true;
			return;
		  }
		}
		this.isFirstClickOnClose = false;
		this.closeClick();
	  }
	}
	*/

	public setCancelable(bool: boolean): void {
		this.isCancelable = bool;
	}



	public onClickClose(): void {
		if (!this.isCancelable) {
			return;
		}

		this.close();
	}


	public close(): void {

		this.openDelegate = null;
		if (this.closeDelegate != null) {
			this.closeDelegate();
			this.closeDelegate = null;
		}

		if (this.componentRef != null) {
			this.componentRef.destroy();
			this.componentRef = null;
		}

	}


	public setComponentRef(componentRef: ComponentRef<PopUpComponent>): void {
		this.componentRef = componentRef;
	}



	public setOnOpenListener(delegate: () => void): void {
		this.openDelegate = delegate;
	}

	public setOnCloseListener(delegate: () => void): void {
		this.closeDelegate = delegate;
	}




	public show(): void {
		ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
			this.popupHeaderCloseImage.src = url;
		});
		ManageData.downloadAsync("assets/images/ic_close_on.png", null);
		ManageData.downloadAsync("assets/images/ic_close_focus.png", null);

		this.popup.scrollTop = 0;
		/* popup.addEventListener("click", (event) => {
		 });*/

		this.onResize();
		if (this.openDelegate != null) {
			this.openDelegate();
		}
		this.render.setStyle(this.popup, "visibility", "visible");
	}


	@HostListener('window:resize', ['$event']) private onResize(): void {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (this.popupCenter.offsetHeight !== 0 && this.popupHeader.offsetHeight !== 0) {
			if (this.popupCenter.getBoundingClientRect().height < h / 1.05) {

				this.popupCenter.style.top = "50%";
				this.popupCenter.style.left = "50%";
				this.popupCenter.style.transform = "translate(-50%, -50%)";
				this.popupCenter.style.borderRadius = "8px";
				this.popupHeader.style.borderTopRightRadius = "8px";
				this.popupHeader.style.borderTopLeftRadius = "8px";

			} else {
				this.popupCenter.style.top = "0";
				this.popupCenter.style.left = "50%";
				this.popupCenter.style.transform = "translateX(-50%)";
				this.popupCenter.style.borderRadius = "0";
				this.popupHeader.style.borderTopRightRadius = "0";
				this.popupHeader.style.borderTopLeftRadius = "0";
			}
		}
	}


	@HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
		var code;
		if (event.key !== undefined) {
			code = event.key; // event.key
		} else if (event.keyCode !== undefined) {
			code = event.keyCode; // event.keyCode deprecated
		}

		switch (code) {
			case "Esc": // IE/Edge specific value
			case "Escape":
			case 27:
				this.close();
				break;

			default:
				return;
		}
	}

}


export namespace PopUpComponent {

	export class Factory {
		public static async build(componentFactoryResolver: ComponentFactoryResolver, dynamicContainer: ViewContainerRef, render: Renderer2): Promise<PopUpComponent> {
			const componentFactory: ComponentFactory<PopUpComponent> = componentFactoryResolver.resolveComponentFactory(PopUpComponent);
			var componentRef: ComponentRef<any> = dynamicContainer.createComponent(componentFactory);
			var popUp: PopUpComponent = componentRef.instance;
			popUp.setComponentRef(componentRef);
			await popUp.initializeLayouts();
			return popUp;
		}

	}


}
