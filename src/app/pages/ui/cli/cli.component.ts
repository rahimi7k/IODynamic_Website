import { Component, HostListener, Renderer2, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { Setting } from '../../setting/setting.service';
import { ManageData } from '../../../@core/ManageData';
import { App } from '../../../app.service';
import { AppComponent } from '../../../app.component';
import { Cli } from './cli.service';
import { Subscription } from 'rxjs';
import { StringUtils } from '../../../@core/Utils/StringUtils';
import { Color } from '../color';
import { StorageUtils } from '../../../@core/Utils/StorageUtils';

@Component({
	selector: 'app-cli',
	templateUrl: './cli.component.html',
	styleUrls: ['./cli.component.scss']
})
export class CliComponent {

	private cli: HTMLElement;
	private cliCenter: HTMLDivElement;
	private cliHeader: HTMLDivElement;
	private cliHeaderCloseImage: HTMLImageElement;
	// private cliBody: HTMLDivElement;
	private cliContainer: HTMLDivElement;
	private ul: HTMLElement;
	private cliCursor: HTMLInputElement;
	private pageCliContainer: HTMLElement;

	private cursorTimer: NodeJS.Timeout;

	private isMoving: boolean = false;
	private oldX: number = 0;
	private oldY: number = 0;
	private oldLeft: number = 0;
	private oldTop: number = 0;
	private distX: number = 0;
	private distY: number = 0;

	public isHome: boolean = null;
	public direction: string = Setting.getDirection();

	private subscriptions: Subscription = new Subscription();


	constructor(private render: Renderer2, private element: ElementRef, private cdref: ChangeDetectorRef, private ngZone: NgZone) {
	}

	ngOnInit(): void {

		this.subscriptions.add(
			Cli.cliLayerSubject.subscribe((caller: string) => {
				if (caller === "Home") {
					this.setCliToHome();

				} else if (caller === "Page") {
					if (StorageUtils.getBoolean(StorageUtils.App, "Cli_Activity", true)) {
						this.setCliToPage();
					} else {
						this.hiddenCli();
					}
				} else if (caller === "Show") {
					StorageUtils.put(StorageUtils.App, "Cli_Activity", true);
					this.setCliToPage();

				} else if (caller === "None") {
						this.hiddenCli();
				}

			})
		);

		this.subscriptions.add(
			Cli.cliMessageSubject.subscribe((Msg: Cli.Message) => {
				this.setMessage(Msg);
			})
		);


	}

	ngAfterViewInit(): void {
		this.pageCliContainer = <HTMLElement>document.getElementById("Page_Cli");
		this.cli = <HTMLElement>document.getElementById("Cli");
		this.cliCenter = <HTMLDivElement>document.getElementById("Cli_Center");
		this.cliHeader = <HTMLDivElement>document.getElementById("Cli_Header");
		this.cliHeaderCloseImage = <HTMLImageElement>document.getElementById("Cli_Header_Close_Img");
		// this.cliBody = <HTMLDivElement>document.getElementById("Cli_Body");
		this.cliContainer = <HTMLDivElement>document.getElementById("Cli_Container");
		this.ul = <HTMLInputElement>document.getElementById("Cli_Ul");
		this.cliCursor = <HTMLInputElement>document.getElementById("Cli_Cursor");


		ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
			this.render.setProperty(this.cliHeaderCloseImage, "src", url);
		});

		ManageData.downloadAsync("assets/images/ic_close_on.png", (url: string): void => {});
		ManageData.downloadAsync("assets/images/ic_close_focus.png", (url: string): void => {});

		this.initial();
	}


	ngOnDestroy(): void {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}

	}



	@HostListener('document:mousedown', ['$event']) onMouseDown(e) {
		if (this.isHome || e.target != this.cliHeader) {
			return;
		}
		this.onHeaderClick(e);
	}


	@HostListener('document:touchstart', ['$event']) onTouchStart(e) {
		if (this.isHome || e.target != this.cliHeader) {
			return;
		}
		this.onHeaderClick(e);
	}


	@HostListener('document:mousemove', ['$event']) onMouseMove(e) {
		if (!this.isMoving) {
			return;
		}

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}

		this.distX = e.clientX - this.oldX;
		this.distY = e.clientY - this.oldY;
		this.pageCliContainer.style.left = this.oldLeft + this.distX + "px";
		this.pageCliContainer.style.top = this.oldTop + this.distY + "px";

		this.onNearEdges();

	}


	@HostListener('document:touchmove', ['$event']) onTouchMove(e) {
		if (!this.isMoving) {
			return;
		}

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}

		if (e.touches != null) {
			this.distX = e.touches[0].clientX - this.oldX;
			this.distY = e.touches[0].clientY - this.oldY;
			this.pageCliContainer.style.left = this.oldLeft + this.distX + "px";
			this.pageCliContainer.style.top = this.oldTop + this.distY + "px";

			this.onNearEdges();
		}
	}



	private onHeaderClick(e): void {

		this.isMoving = true;

		if (e.clientX) {
			this.oldX = e.clientX; // If they exist then use Mouse input
			this.oldY = e.clientY;
		} else {
			this.oldX = e.touches[0].clientX; // Otherwise use touch input
			this.oldY = e.touches[0].clientY;
		}

		this.oldLeft = Number(window.getComputedStyle(this.pageCliContainer).getPropertyValue('left').split('px')[0]) * 1;
		this.oldTop = Number(window.getComputedStyle(this.pageCliContainer).getPropertyValue('top').split('px')[0]) * 1;
	}


	private onNearEdges(): void {

		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		if (this.pageCliContainer.getBoundingClientRect().top < 40) {
			this.distY = 0;
			this.pageCliContainer.style.top = 0 + "px";
		}

		if (this.pageCliContainer.getBoundingClientRect().left < 40) {
			this.distX = 0;
			this.pageCliContainer.style.left = 0 + "px";
		}


		if (h - this.cliCenter.getBoundingClientRect().bottom < 40) {
			var pos: number = h - this.cliCenter.getBoundingClientRect().height;
			this.distY = pos;
			this.pageCliContainer.style.top = pos + "px";
		}

		if (w - this.cliCenter.getBoundingClientRect().right < 40) {
			var pos: number = w - this.cliCenter.getBoundingClientRect().width;
			this.distX = pos;
			this.pageCliContainer.style.left = pos + "px";
		}
	}



	@HostListener('document:mouseup', ['$event']) onMouseUp(e) {
		this.isMoving = false;
	}

	@HostListener('document:touchend', ['$event']) onTouchUp(e) {
		this.isMoving = false;
	}


	@HostListener('window:resize', ['$event']) onResize() {

		if (this.cliCenter == null) {
			return;
		}

		this.updateHtmlVariables();

		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		this.distX = (w / 2) - (this.cliCenter.getBoundingClientRect().width / 2);
		this.pageCliContainer.style.left = this.distX + "px";

		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var pos: number = h - this.cliCenter.getBoundingClientRect().height;
		this.distY = pos;
		this.pageCliContainer.style.top = pos + "px";
	}




	public setMessage(msg: Cli.Message): void {

		var isScrollOnBottom = true;

		if (this.cliContainer.scrollTop + this.cliContainer.offsetHeight < this.cliContainer.scrollHeight - 5) {
			isScrollOnBottom = false;
		}

		const li: HTMLLIElement = this.render.createElement("li");
		li.innerHTML = msg.text;
		if (msg.color != null) {
			this.render.setStyle(li, "color", msg.color);
		} else {
			this.render.setStyle(li, "color", Color.Color.White);
		}
		this.render.appendChild(this.ul, li);

		if (isScrollOnBottom) {
			this.cliContainer.scrollTop = this.cliContainer.scrollHeight;
		}
	}



	public initial(): void {
		var msg: Cli.Message = new Cli.Message();
		msg.text = AppComponent.language.Cli_Text_Welcome + "&nbsp; &nbsp;[ " +
			AppComponent.language.Cli_Text_Version + " " + StorageUtils.getString(StorageUtils.App, "Version", "1.0.0") + " ]";
		this.setMessage(msg);

		this.onResize(); // because pages call sooner and width & height not ready yet!

		if (window.location.pathname === "/home") {
			this.setCliToHome();

		} else {
			var isActive: boolean = StorageUtils.getBoolean(StorageUtils.App, "Cli_Activity", null);
			if (isActive != null) {
				if (isActive) {
					this.setCliToPage();
				} else {
					this.hiddenCli();
					return;
				}
			} else {
				if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 575) {
					this.setCliToPage();
				} else {
					this.hiddenCli();
					return;
				}
			}
	
		}
	}





	public setCliToHome(): void {

		if (this.cli == null) {
			return;
		}

		this.render.setStyle(this.pageCliContainer, "display", "none")
		this.render.setStyle(this.pageCliContainer, "visibility", "hidden");
		this.render.setStyle(this.cli, "visibility", "visible");
		this.render.setStyle(this.cliHeaderCloseImage, "visibility", "hidden");

		this.ngZone.run(() => {
			this.isHome = true;
		});
		// this.cdref.detectChanges();

		this.startCursor();
		this.element.nativeElement.style.setProperty('--cli-position', 'static');
		this.element.nativeElement.style.setProperty('--cli-center-position', 'relative');

		this.updateHtmlVariables();
	}



	public setCliToPage(): void {

		if (this.cli == null) {
			return;
		}

		this.render.setStyle(this.pageCliContainer, "display", "block");
		this.render.setStyle(this.pageCliContainer, "visibility", "visible");
		this.render.setStyle(this.cli, "visibility", "visible");
		this.render.setStyle(this.cliHeaderCloseImage, "visibility", "visible");


		this.ngZone.run(() => {
			this.isHome = false;
		});
		// this.cdref.detectChanges();

		this.startCursor();
		this.element.nativeElement.style.setProperty('--cli-position', 'absolute');
		this.element.nativeElement.style.setProperty('--cli-center-position', 'fixed');

		this.onResize();

		// this.cmd.scrollTo(0, document.body.scrollHeight);
		this.cliContainer.scrollTop = this.cliContainer.scrollHeight;
	}



	private hiddenCli(): void {
		StorageUtils.put(StorageUtils.App, "Cli_Activity", false);

		if (this.cli == null) {
			return;
		}

		this.render.setStyle(this.pageCliContainer, "display", "none")
		this.render.setStyle(this.pageCliContainer, "visible", "hidden");
		this.render.setStyle(this.cli, "visibility", "hidden");
		this.render.setStyle(this.cliCursor, "visibility", "hidden");
		this.render.setStyle(this.cliHeaderCloseImage, "visibility", "hidden");

		clearInterval(this.cursorTimer);
		this.cursorTimer = null;
	}





	private updateHtmlVariables(): void {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (this.isHome) {
			this.element.nativeElement.style.setProperty('--cli-header-height', '8px');

			if (w < 575) {
				this.element.nativeElement.style.setProperty('--cli-height', '150px');
				this.element.nativeElement.style.setProperty('--cli-border-width', '5px');
			} else {
				this.element.nativeElement.style.setProperty('--cli-height', '260px');
				this.element.nativeElement.style.setProperty('--cli-border-width', '7px');
			}

		} else {
			if (w < 575) {
				this.element.nativeElement.style.setProperty('--cli-height', '105px');
				this.element.nativeElement.style.setProperty('--cli-header-height', '20px');
				this.element.nativeElement.style.setProperty('--cli-border-width', '0');
			} else {
				this.element.nativeElement.style.setProperty('--cli-height', '170px');
				this.element.nativeElement.style.setProperty('--cli-header-height', '26px');
				this.element.nativeElement.style.setProperty('--cli-border-width', '4px');
			}
		}
	}




	private startCursor(): void {
		if (this.cursorTimer == null) {
			this.cursorTimer = setInterval(() => {
				if (this.cliCursor != null) {
					if (this.cliCursor.style.visibility === "visible") {
						this.render.setStyle(this.cliCursor, "visibility", "hidden");
					} else {
						this.render.setStyle(this.cliCursor, "visibility", "visible");
					}
				}
			}, 500);
		}
	}








	public onCloseDown(): void {
		ManageData.downloadAsync("assets/images/ic_close_focus.png", (url: string): void => {
			this.render.setProperty(this.cliHeaderCloseImage, "src", url);
		});
	}

	public onCloseUp(): void {
		ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
			this.render.setProperty(this.cliHeaderCloseImage, "src", url);
		});
	}


	public onCloseClick(): void {
		ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
			this.render.setProperty(this.cliHeaderCloseImage, "src", url);
		});
		this.hiddenCli();
		Setting.settingSubject.next("onClickCliClose");
	}







	public async onMouseOverClose(status: number): Promise<void> {
		var url: string;
		if (status === 0) {
			url = await ManageData.download("assets/images/ic_close.png");
		} else {
			url = await ManageData.download("assets/images/ic_close_on.png");
		}
		if (!StringUtils.isEmpty(url)) {
			this.render.setProperty(this.cliHeaderCloseImage, "src", url);
		}
	}




	// App.loadScript("assets/js/move-cli.js");
	/*
	var onClick = (e) => {
		let target = e.target;

		console.log("target", target);

		if (target.id != "Cli_Header") {
			return;
		}

		this.isMoving = true;

		if (e.clientX) {
			console.log("Mouse1");
			this.oldX = e.clientX; // If they exist then use Mouse input
			this.oldY = e.clientY;
		} else {
			console.log("Touch1");
			this.oldX = e.touches[0].clientX; // Otherwise use touch input
			this.oldY = e.touches[0].clientY;
		}

		this.oldLeft = Number(window.getComputedStyle(this.cli).getPropertyValue('left').split('px')[0]) * 1;
		this.oldTop = Number(window.getComputedStyle(this.cli).getPropertyValue('top').split('px')[0]) * 1;


		var move = (event) => {
			// event.preventDefault();

			console.log("Move");
			if (!this.isMoving) {
				return;
			}

			if (event.clientX) {
				console.log("Mouse2");
				this.distX = event.clientX - this.oldX;
				this.distY = event.clientY - this.oldY;
			} else {
				console.log("event.touches", event.touches);
				if (event.touches != null) {
					console.log("Touch2");
					this.distX = event.touches[0].clientX - this.oldX;
					this.distY = event.touches[0].clientY - this.oldY;
				}
			}

			this.cli.style.left = this.oldLeft + this.distX + "px";
			this.cli.style.top = this.oldTop + this.distY + "px";
		}



		document.onmousemove = move;

		document.ontouchmove = move;


		var endDrag = () => {
			this.isMoving = false;
		}
		this.cli.onmouseup = endDrag;

		this.cli.ontouchend = endDrag;

	}

	document.onmousedown = onClick;

	document.ontouchstart = onClick;
	*/



}
