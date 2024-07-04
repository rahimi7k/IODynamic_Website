import { Injectable, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ComponentRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StringUtils } from '../../@core/Utils/StringUtils';
import { CircleLoadSimpleComponent } from './circle-load-simple/circle-load-simple.component';

@Injectable({
	providedIn: 'root',
})
export class UITask {

	public static createHint(inputElement: HTMLInputElement, paragraphHintElement: HTMLParagraphElement, hintText: string): void {
		if (inputElement == null || paragraphHintElement == null || hintText == null) {
			if (inputElement == null) {
				console.error("Error in createHint, inputElement is null");
			}
			if (paragraphHintElement == null) {
				console.error("Error in createHint, paragraphHintElement is null");
			}
			if (hintText == null) {
				console.error("Error in createHint, hintText is null");
			}
			return;
		}

		AppComponent.render.setProperty(paragraphHintElement, "innerHTML", hintText);
		AppComponent.render.addClass(inputElement, "form-input-invalid");
		AppComponent.render.removeClass(inputElement, "form-input");
	}


	public static removeHint(inputElement: HTMLInputElement, paragraphHintElement: HTMLParagraphElement): void {
		if (inputElement == null || paragraphHintElement == null) {
			if (inputElement == null) {
				console.error("Error in removeHint, inputElement is null");
			}
			if (paragraphHintElement == null) {
				console.error("Error in removeHint, paragraphHintElement is null");
			}
			return;
		}

		AppComponent.render.setProperty(paragraphHintElement, "innerHTML", "");
		AppComponent.render.removeClass(inputElement, "form-input-invalid");
		AppComponent.render.addClass(inputElement, "form-input");
	}



	public static onTypeInteger(e): void {
		e.target.value = StringUtils.toNumberFormat(e.target.value.toString().replace("+", "").replace("-", ""));
	}


	public static rotate(element: HTMLElement, degrees: number): void;
	public static rotate(element: HTMLElement, degrees: number, duration: number): void;
	public static rotate(element: HTMLElement, degrees: number, duration?: number): void {
		if (element != null) {
			AppComponent.render.setStyle(element, '-webkit-transform', 'rotate(' + degrees + 'deg)'); // chrome
			AppComponent.render.setStyle(element, '-ms-transform', 'rotate(' + degrees + 'deg)'); /* IE 9 */
			AppComponent.render.setStyle(element, 'transform', 'rotate(' + degrees + 'deg)');
			AppComponent.render.setStyle(element, 'overflow', 'hidden');
			AppComponent.render.setStyle(element, 'transition-property', 'transform');
			if (duration != null && duration >= 0) {
				AppComponent.render.setStyle(element, 'transition-duration', duration + 's');
			} else {
				AppComponent.render.setStyle(element, 'transition-duration', '0.23s');
			}
		}
	}


	public static changeScrollStatus(isEnable: boolean): void {
		var scrolElement: HTMLElement = <HTMLElement>document.getElementsByClassName("scrollable-container")[0];
		if (scrolElement == null) {
			return;
		}
		if (isEnable) {
			scrolElement.style.overflow = "auto";
		} else {
			scrolElement.style.overflow = "hidden";
		}
	}


	public static async createCircleLoadSimple(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, parent: HTMLElement): Promise<ComponentRef<CircleLoadSimpleComponent>> {
		const componentFactory: ComponentFactory<CircleLoadSimpleComponent> = componentFactoryResolver.resolveComponentFactory(CircleLoadSimpleComponent);
		var componentRef: ComponentRef<CircleLoadSimpleComponent> = viewContainerRef.createComponent(componentFactory);
		var circleLoadElement: HTMLElement = await componentRef.instance.initializeLayouts();
		AppComponent.render.appendChild(parent, circleLoadElement);

		return componentRef;
	}


}
