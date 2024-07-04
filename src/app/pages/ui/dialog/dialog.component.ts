import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, Renderer2, ViewChild, ViewContainerRef, NgZone, ComponentDecorator, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { ManageData } from '../../../@core/ManageData';
import { Setting } from 'app/pages/setting/setting.service';
import { map, filter, startWith, take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { StringUtils } from '../../../@core/Utils/StringUtils';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {

	public direction: string;
	public componentId: string;
	private isCancelable: boolean = true;

	private dialog: HTMLDivElement;
	private dialogCenter: HTMLDivElement;
	private dialogHeader: HTMLDivElement;
	private dialogHeaderCloseImage: HTMLImageElement;
	private dialogBody: HTMLDivElement;
	private dialogContainer: HTMLDivElement;

	private closeDelegate;
	private openDelegate;

	private componentRef: ComponentRef<DialogComponent>;

	constructor(public render: Renderer2,
		private zone: NgZone,
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
	}


	ngOnDestroy(): void {

	}



	public async initializeLayouts(): Promise<HTMLElement> {
		return new Promise<HTMLElement>((resolve): void => {
			interval(50).pipe(
				startWith(0),
				map(() => {
					if (this.dialogContainer == null) {
						this.zone.run(() => {
							this.dialogContainer = <HTMLDivElement>document.getElementById("Dialog_Container_" + this.componentId);
						});
						if (this.dialogContainer != null) {
							this.zone.run(() => {
								this.dialog = <HTMLDivElement>document.getElementById("Dialog_" + this.componentId);
								this.dialogCenter = <HTMLDivElement>document.getElementById("Dialog_Center_" + this.componentId);
								this.dialogHeader = <HTMLDivElement>document.getElementById("Dialog_Header_" + this.componentId);
								this.dialogHeaderCloseImage = <HTMLImageElement>document.getElementById("Dialog_Header_Close_Img_" + this.componentId);
								this.dialogBody = <HTMLDivElement>document.getElementById("Dialog_Body_" + this.componentId);							});
						}
					}
				}),
				filter((res): boolean => {
					return this.dialogContainer != null;
				}),
				take(1),
				//tap(res => {
				//	We can also use here
				//})
			).subscribe(() => {
				resolve(this.dialog.parentElement);
			});
		});
	}



	public getBodyLayout(): HTMLElement {
		return this.dialogBody;
	}


	public getConatinerLayout(): HTMLElement {
		return this.dialogContainer;
	}



	public show(): void {

		ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
			this.dialogHeaderCloseImage.src = url;
		});
		ManageData.downloadAsync("assets/images/ic_close_on.png", null);
		ManageData.downloadAsync("assets/images/ic_close_focus.png", null);

		this.dialog.scrollTop = 0;
		this.showDialog();
	}



	public setCancelable(bool: boolean): void {
		this.isCancelable = bool;
	}


	public setComponentRef(componentRef: ComponentRef<DialogComponent>): void {
		this.componentRef = componentRef;
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



	public setOnOpenListener(delegate: () => void): void {
		this.openDelegate = delegate;
	}

	public setOnCloseListener(delegate: () => void): void {
		this.closeDelegate = delegate;
	}


	private showDialog(): void {
		this.onResize();
		if (this.openDelegate != null) {
			this.openDelegate();
		}
		this.render.setStyle(this.dialog, "visibility", "visible");
	}


	@HostListener('window:resize', ['$event']) private onResize(): void {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (this.dialogCenter.offsetHeight !== 0 && this.dialogHeader.offsetHeight !== 0) {
			if (this.dialogCenter.getBoundingClientRect().height < h / 1.05) {

				this.dialogCenter.style.top = "50%";
				this.dialogCenter.style.left = "50%";
				this.dialogCenter.style.transform = "translate(-50%, -50%)";
				this.dialogCenter.style.borderRadius = "8px";
				this.dialogHeader.style.borderTopRightRadius = "8px";
				this.dialogHeader.style.borderTopLeftRadius = "8px";

			} else {
				this.dialogCenter.style.top = "0";
				this.dialogCenter.style.left = "50%";
				this.dialogCenter.style.transform = "translateX(-50%)";
				this.dialogCenter.style.borderRadius = "0";
				this.dialogHeader.style.borderTopRightRadius = "0";
				this.dialogHeader.style.borderTopLeftRadius = "0";
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


export namespace DialogComponent {

	export class Factory {
		public static async build(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, render: Renderer2): Promise<DialogComponent> {
			const componentFactory: ComponentFactory<DialogComponent> = componentFactoryResolver.resolveComponentFactory(DialogComponent);
			var componentRef: ComponentRef<DialogComponent> = viewContainerRef.createComponent(componentFactory);
			var dialog: DialogComponent = componentRef.instance;
			dialog.setComponentRef(componentRef);
			await dialog.initializeLayouts()
			return dialog;
		}


	}


}

