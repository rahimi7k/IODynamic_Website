import { Component, Renderer2, NgZone, Input, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Setting } from '../../../../app/pages/setting/setting.service';
import { StringUtils } from '../../../@core/Utils/StringUtils';
import { Main } from '../../../main';
import { map, take, filter, throttleTime, startWith, takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import { Color } from '../color';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnDestroy, AfterViewInit {


	public direction: string;
	public componentId: string;

	private button: HTMLButtonElement;
	private imgElement: HTMLElement;
	private textElement: HTMLElement;
	private loadElement: HTMLElement;

	private clickDelegate: () => void;
	public isVisible: boolean = true;
	public isLock: boolean = false;

	@Input() text: string;
	@Input() imgSrc: string;
	@Input() imgInnerHTML: string;
	@Input() isStatic: boolean;


	constructor(private render: Renderer2, private zone: NgZone) {
		this.componentId = StringUtils.generateUniqueId();
		this.direction = Setting.getDirection();
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.button = <HTMLButtonElement>document.getElementById("Button_" + this.componentId);
		this.textElement = this.button.querySelector("span");
		this.loadElement = this.button.querySelector(".load");
		if (!StringUtils.isEmpty(this.imgSrc)) {
			this.imgElement = this.render.createElement("img");
			this.render.setProperty(this.imgElement, "src", this.imgSrc);
			this.render.setProperty(this.imgElement, "className", "img");
			this.render.insertBefore(this.button, this.imgElement, this.textElement);
		} else if (!StringUtils.isEmpty(this.imgInnerHTML)) {
			this.imgElement = this.render.createElement("div");
			this.render.setProperty(this.imgElement, "innerHTML", this.imgInnerHTML);
			this.render.setProperty(this.imgElement, "className", "img");
			this.render.insertBefore(this.button, this.imgElement, this.textElement);
		}

		if (this.isStatic != null && this.isStatic) {
			this.showDisplay();
		}

	}


	ngOnDestroy(): void {
	}


	public async initializeLayouts(): Promise<HTMLElement> {
		return new Promise<HTMLElement>((resolve): void => {
			interval(20).pipe(
				startWith(0),
				// map(() => {}),
				filter((res): boolean => {
					return this.button != null;
				}),
				take(1),
			).subscribe(() => {
				resolve(this.button.parentElement);
			});
		});
	}
	/*
	public initializeLayouts(delegate: (parent: HTMLElement) => void): void {
		interval(20).pipe(
			startWith(0),
			// map(() => {}),
			filter((res): boolean => {
				return this.button != null;
			}),
			take(1),
		).subscribe(() => {
			if (delegate != null) {
				delegate(this.button.parentElement);
			}
		});
	}
	*/

	public getParentElement(): HTMLElement {
		return this.button.parentElement;
	}

	public getButtonElement(): HTMLButtonElement {
		return this.button;
	}

	public showDisplay(): void {
		this.render.setStyle(this.button, "position", "static");
		this.render.setStyle(this.button, "visibility", "inherit");
	}



	public onClick(): void {
		if (this.clickDelegate != null) {
			this.clickDelegate();
		}
	}


	public setOnClickListener(delegate: () => void): void {
		this.clickDelegate = delegate;
	}

	public setLock(bool: boolean): void {
		this.isLock = bool;
		if (bool) {
			this.render.setProperty(this.button, "disabled", true);
			this.render.setStyle(this.button, 'cursor', 'not-allowed');

			if (this.loadElement != null) {
				if (this.imgElement != null) {
					this.render.setStyle(this.imgElement, 'display', 'none');
				}
				this.render.setStyle(this.textElement, 'display', 'none');
				this.render.setStyle(this.loadElement, 'display', 'inline-block');
			}
		} else {
			this.render.removeAttribute(this.button, "disabled");
			this.render.setStyle(this.button, 'cursor', 'pointer');

			if (this.loadElement != null) {
				if (this.imgElement != null) {
					this.render.setStyle(this.imgElement, 'display', 'inline');
				}
				this.render.setStyle(this.textElement, 'display', 'inline');
				this.render.setStyle(this.loadElement, 'display', 'none');
			}
		}
	}


	public addClass(className: string): void {
		this.render.addClass(this.button, className);
	}

	public removeClass(className: string): void {
		this.render.removeClass(this.button, className);
	}

	public setStyle(styleName: string, styleValue: string): void {
		this.render.setStyle(this.button, styleName, styleValue);
	}

	public setColor(color: Color.Color): void;
	public setColor(color: string): void;
	public setColor(color: Color.Color | string): void {
		this.render.setStyle(this.button, "background-color", color);
		this.render.setStyle(this.button, "-webkit-filter", "drop-shadow(0px 0px 1px " + color + ")");
		this.render.setStyle(this.button, "filter", "drop-shadow(0px 0px 1px " + color + ")");
	}

	public setSize(width: string, height: string): void {
		if (!StringUtils.isEmpty(width)) {
			this.render.setStyle(this.button, "width", width);
		}
		if (!StringUtils.isEmpty(height)) {
			this.render.setStyle(this.button, "height", height);
		}
	}

	public setDisable(bool: boolean): void {
		if (bool) {
			this.render.setAttribute(this.button, "disabled", "true");
		} else {
			this.render.removeAttribute(this.button, "disabled");
		}
	}

}

export namespace ButtonComponent {

	export class Factory {

		public static async build(componentFactoryResolver: ComponentFactoryResolver, dynamicContainer: ViewContainerRef, render: Renderer2, parent: HTMLElement): Promise<ComponentRef<ButtonComponent>> {
			const componentFactory: ComponentFactory<ButtonComponent> = componentFactoryResolver.resolveComponentFactory(ButtonComponent);
			var componentRef: ComponentRef<ButtonComponent> = dynamicContainer.createComponent(componentFactory);
			render.appendChild(parent, await componentRef.instance.initializeLayouts());
			componentRef.instance.showDisplay();
			return componentRef;
		}
	}
}



