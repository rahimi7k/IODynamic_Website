import { Component, Renderer2, NgZone } from '@angular/core';
import { StringUtils } from '../../../@core/Utils/StringUtils';
import { Color } from '../color';
import { map, filter, startWith, take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
	selector: 'circle-load-simple',
	templateUrl: './circle-load-simple.component.html',
	styleUrls: ['./circle-load-simple.component.scss'],
})
export class CircleLoadSimpleComponent {

	public componentId: string = Date.now() + StringUtils.generateHash(5);
	private animation: HTMLDivElement;
	private svg: HTMLElement;

	constructor(private render: Renderer2, private zone: NgZone) {
	}

	public async initializeLayouts(): Promise<HTMLElement> {

		return new Promise<HTMLElement>((resolve): void => {
			interval(50).pipe(
				startWith(0),
				map(() => {
					this.animation = <HTMLDivElement>document.getElementById("Circle_Load_Simple_" + this.componentId);
					this.svg = <HTMLDivElement>document.getElementById("Circle_Load_Simple_Svg_" + this.componentId);
				}),
				filter((res): boolean => {
					return this.animation != null;
				}),
				take(1),
			).subscribe(() => {
				resolve(this.animation.parentElement);
			});
		});
	}

	public getContainer(): HTMLElement {
		return this.animation;
	}


	public show(): void {
		this.render.setStyle(this.svg.querySelector("path"), "fill", Color.getRandomColor());
		this.render.setStyle(this.animation, "visibility", "visible");
	}

	public hidden(): void {
		this.render.setStyle(this.animation, "visibility", "hidden");
	}


}
