import { Directive, ElementRef, HostListener, Host } from '@angular/core';
import { ManageData } from '../../../@core/ManageData';


@Directive({
    selector: '[closeImgDirective]',
    host: {
        '(mousedown)': 'this.onCloseDown();',
        '(mouseup)': 'this.onCloseUp()',
        '(touchend)': 'this.onCloseUp()',
        '(mouseenter)': 'this.onMouseInElement(1)',
        '(mouseleave)': 'this.onMouseInElement(0)',
        '(dragstart)': 'onDragStart()',
	}
})
export class CloseImageDirectrive {

    constructor(private el: ElementRef) {
        this.el.nativeElement.addEventListener('touchstart', this.onTouchStart(), { passive: true });
    }

    // The mouseover event triggers when the mouse pointer enters the div element, and its child elements.
    // The mouseenter event is only triggered when the mouse pointer enters the div element.
    /*
    @HostListener('mouseover') onMouseEnter() {
        console.log("mouseover")
        this.onMouseInElement(0);
    }
     */

    // The mouseout event triggers when the mouse pointer leaves any child elements as well the selected element.
    // The mouseleave event is only triggered when the mouse pointer leaves the selected element.
    /*
    @HostListener('mouseout') onMouseLeave() {
        console.log("mouseout")
        this.onMouseInElement(1);
    }
   */



    /*
    @HostListener('mousedown') onMouseDown() {
        this.onCloseDown();
    }

    @HostListener('mouseup') onMouseUp() {
        this.onCloseUp();
    }*/


    // [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event
    // @HostListener not support passive: true
    private onTouchStart(): void {
        this.onCloseDown();
	}

    /*
    @HostListener('touchend') onTouchEnd() {
        this.onCloseUp();
    }

    @HostListener('mouseenter') onMouseOver() {
        this.onMouseInElement(1);
    }

    @HostListener('mouseleave') onMouseOut(e) {
        this.onMouseInElement(0);
    }
    */


    private onDragStart(): boolean {
        return false;
    }

    private onCloseDown(): void {
        ManageData.downloadAsync("assets/images/ic_close_focus.png", (url: string): void => {
            this.el.nativeElement.src = url;
        });
    }

    private onCloseUp(): void {
        ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
            this.el.nativeElement.src = url;
        });
    }


    private onMouseInElement(status: number): void {
        if (status === 0) {
            ManageData.downloadAsync("assets/images/ic_close.png", (url: string): void => {
                this.el.nativeElement.src = url;
            });
        } else {
            ManageData.downloadAsync("assets/images/ic_close_on.png", (url: string): void => {
                this.el.nativeElement.src = url;
            });
        }
    }

}