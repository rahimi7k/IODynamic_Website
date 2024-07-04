import { Component, HostListener, Renderer2, NgZone, ElementRef, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ComponentRef, Input } from '@angular/core';
import { ArrayList } from '../../../@core/Utils/ArrayList';
import { UITask } from '../UITask';
import { Setting } from '../../../../app/pages/setting/setting.service';
import { StringUtils } from '../../../@core/Utils/StringUtils';
import { AppComponent } from '../../../app.component';
import { Main } from '../../../main';
import { map, take, filter, throttleTime, startWith, takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends Main {

	public direction: string;
	public componentId: string;
	private selectedIndex: number = -1;
	private iFinish;
	private iChange;
	private isLock: boolean;

	public default: SelectComponent.Option;
	public options: ArrayList<SelectComponent.Option>;

	private button: HTMLButtonElement;
	private image: HTMLImageElement;
	private buttonTextContainer: HTMLDivElement;
	private p: HTMLParagraphElement;
	private icArrow: HTMLElement;
	private dropdown: HTMLElement;
	private select: HTMLElement;
	private arrowImg: HTMLElement;

	private totalItemInDisplay: number = 0;
	public isLoadingList: boolean = false;


	@Input() isStatic: boolean;


	constructor(private render: Renderer2, private zone: NgZone, private elementRef: ElementRef) {
		super();
	}

	ngOnInit() {
		this.zone.run(() => {
			this.componentId = StringUtils.generateUniqueId();
			this.direction = Setting.getDirection();
		});
	}

	ngAfterViewInit(): void {
		this.dropdown = document.getElementById("Select_DropDown_" + this.componentId);
		this.select = document.getElementById("Select_" + this.componentId);
		this.button = <HTMLButtonElement>document.getElementById("Select_Button_" + this.componentId);
		this.icArrow = document.getElementById("Select_Button_Icon_Arrow_" + this.componentId);
		this.arrowImg = document.getElementById("Select_Button_Icon_Arrow_" + this.componentId);


		var scrollStream: Subject<any> = new Subject<any>();
		this.dropdown.addEventListener('scroll', () => {
			scrollStream.next();
		})

		scrollStream.pipe(
			filter((): boolean => {
				return this.dropdown.offsetHeight + this.dropdown.scrollTop > this.dropdown.scrollHeight - 100;
			}),
			throttleTime(100),
		).subscribe(() => {
			if (!this.isLoadingList) {
				this.onLoadItems();
			}
		});
	
		if (this.isStatic != null && this.isStatic) {
			this.showDisplay();
		}

	}


	ngOnDestroy(): void {
	}


	public async initializeLayouts(): Promise<HTMLElement> {

		return new Promise<HTMLElement>((resolve): void => {
			interval(50).pipe(
				startWith(0),
				//map(() => {}),
				filter((res): boolean => {
					return this.dropdown != null;
				}),
				take(1),
			).subscribe(() => {
				resolve(this.select.parentElement);
			});
		});
	}


	public async createItems(): Promise<void> {

		this.selectedIndex = null;
		this.totalItemInDisplay = 0;

		this.render.setProperty(this.button, "disabled", true);
		console.log("this.default", this.default);
		console.log("this.options", this.options);


		// Remove old items, necessary because of multi call of createItems!
		let itemCounts: number = this.dropdown.childElementCount;
		for (let counter = 0; counter < itemCounts; counter++) {
			this.dropdown.removeChild(this.dropdown.children[0]);
		}


		if (this.image != null) {
			this.render.removeChild(this.button, this.image);
		}
		if (this.buttonTextContainer != null) {
			this.render.removeChild(this.button, this.buttonTextContainer);
		}

		if (this.default != null && !StringUtils.isEmpty(this.default.text)) {
			if (!StringUtils.isEmpty(this.default.image)) {
				this.image = this.render.createElement("img");
				this.render.setProperty(this.image, "src", this.default.image);
				this.render.setProperty(this.image, "className", "select-img");
				this.render.appendChild(this.button, this.image);
			}

			this.buttonTextContainer = this.render.createElement("div");
			this.render.setProperty(this.buttonTextContainer, "className", "text-container");
			this.render.appendChild(this.button, this.buttonTextContainer);
			this.p = this.render.createElement("p");
			this.render.appendChild(this.buttonTextContainer, this.p);
			this.render.setProperty(this.p, "innerHTML", this.default.text);

			if (this.iChange != null) {
				this.iChange(this.default);
			}

		} else {
			this.buttonTextContainer = this.render.createElement("div");
			this.render.setProperty(this.buttonTextContainer, "className", "text-container");
			this.render.appendChild(this.button, this.buttonTextContainer);
			this.p = this.render.createElement("p");
			this.render.appendChild(this.buttonTextContainer, this.p);
			this.render.setProperty(this.p, "innerHTML", AppComponent.language.Select_Choose_From_List);
		}

		this.onLoadItems();

		this.render.setProperty(this.button, "disabled", false);

		if (this.iFinish instanceof Function) {
			this.iFinish();
		}

		if (this.dropdown.childElementCount === 0) {
			var noItemDiv: HTMLDivElement = this.render.createElement("div");
			this.render.setProperty(noItemDiv, "className", "no-item");
			this.render.appendChild(this.dropdown, noItemDiv);

			var text: HTMLParagraphElement = this.render.createElement("p");
			this.render.setProperty(text, "innerHTML", AppComponent.language.Select_No_Item);
			this.render.appendChild(noItemDiv, text);
		}

	}


	private onLoadItems(): void {

		this.isLoadingList = true;
		var initialItemCount: number = this.totalItemInDisplay;
		for (var i: number = initialItemCount; i < initialItemCount + 25; i++) {

			if (i > this.options.length() - 1) {
				break;
			}

			const j = i;
			const itemElementConatainer: HTMLDivElement = this.render.createElement("div");
			this.render.setProperty(itemElementConatainer, "className", "item-container");
			this.render.appendChild(this.dropdown, itemElementConatainer);
			this.render.listen(itemElementConatainer, 'click', () => {
				this.clickOption(j);
			});

			let itemElement: HTMLDivElement = this.render.createElement("div");
			this.render.setProperty(itemElement, "className", "item");
			this.render.appendChild(itemElementConatainer, itemElement);

			if (this.options.get(i).image != null && this.options.get(i).image !== "") {
				let img = this.render.createElement("img");
				this.render.appendChild(itemElement, img);
				this.render.setProperty(img, 'src', this.options.get(i).image);
			}

			let msg: HTMLParagraphElement = this.render.createElement("p");
			this.render.appendChild(itemElement, msg);
			this.render.setProperty(msg, 'innerHTML', this.options.get(i).text);

			if (this.default != null) {
				if (this.options.get(i).text === this.default.text) {
					this.selectedIndex = i;
				}
			}

			if (this.options.get(i).description != null && this.options.get(i).description !== "") {
				let label: HTMLParagraphElement = this.render.createElement("p");
				this.render.setProperty(label, "innerHTML", this.options.get(i).description);
				this.render.setProperty(label, "className", "description");
				this.render.appendChild(itemElement, label);
			}

			this.totalItemInDisplay += 1;
		}

		this.isLoadingList = false;
	}



	public showDisplay(): void {
		this.render.setStyle(this.select, "position", "static");
		this.render.setStyle(this.select, "visibility", "inherit");
	}




	public showSelect(event): void {
		if (!this.dropdown.classList.contains("show")) {
			this.dropdown.classList.add("show");
			UITask.rotate(this.arrowImg, 180);
		}
	}


	public clickOption(index: number): void {
		if (this.isLock) {
			return;
		}

		this.selectedIndex = index;

		var option: SelectComponent.Option = this.options.get(index);

		this.render.setProperty(this.p, "innerHTML", option.text);
		if (!StringUtils.isEmpty(option.image)) {
			this.render.setProperty(this.image, "src", option.image);
		}

		if (this.iChange != null && this.iChange instanceof Function) {
			this.iChange(option);
		}
	}


	@HostListener('window:click', ['$event']) onCilickOutSide(event) {
		if (this.button != null && !this.button.contains(event.target) && this.dropdown.classList.contains("show")) {
			this.dropdown.classList.remove("show");
			UITask.rotate(this.arrowImg, 0);
		}
	}


	public onChange(iChange: (selected: SelectComponent.Option) => void): void {
		this.iChange = iChange;
	}

	public onFinish(iFinish: () => void): void {
		this.iFinish = iFinish;
	}


	public getSelectedItem(): SelectComponent.Option {
		return this.options.get(this.selectedIndex);
	}

	public clearSelect(): void {
		this.selectedIndex = -1;
		this.render.setProperty(this.p, "innerHTML", AppComponent.language.Select_Choose_From_List);
	}

	public setLock(isLock: boolean): void {
		this.isLock = isLock;
	}


}



export namespace SelectComponent {

	export class Option {
		public id: string | number;
		public text: string;
		public image: string;
		public description: string;

		constructor(id: string, text: string, image: string, description?: string) {
			this.id = id;
			this.text = text;
			this.image = image;
			this.description = description;
		}
	}



	export class Factory {

		public static async build(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, render: Renderer2, parent: HTMLElement): Promise<ComponentRef<SelectComponent>> {
			const componentFactory: ComponentFactory<SelectComponent> = componentFactoryResolver.resolveComponentFactory(SelectComponent);
			var componentRef: ComponentRef<SelectComponent> = viewContainerRef.createComponent(componentFactory);
			render.appendChild(parent, await componentRef.instance.initializeLayouts());
			componentRef.instance.showDisplay();
			return componentRef;
		}
	}

}
