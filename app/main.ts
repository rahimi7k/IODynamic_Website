import { OnInit, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, Injectable } from '@angular/core';
import { Language } from './@theme/language/language';
import { AppComponent } from './app.component';
import { Setting } from './pages/setting/setting.service';
import { UITask } from './pages/ui/UITask';
import { Header } from './@theme/components/header/header.service';

@Injectable({
    providedIn: 'root',
})
export abstract class Main implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {

	public languageName: string = Setting.getLanguage();
	public direction: string = Setting.getDirection();
	public language: Language = AppComponent.language;


    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        // Update Menu after new page initiate -- because of library
        if (Header.menuElement != null && Header.sideBarButtonElement != null) {
            if (window.innerWidth < 1200) {
                if (Header.sideBarStatus === "expanded") {
                    Header.sideBarButtonElement.click();
                }
            }
        }    }

    public ngAfterContentInit(): void {
    }

    public ngAfterContentChecked(): void {
    }

    public ngOnDestroy(): void {
    }

    public onConnectionStateChange(state: number): void {
    }

}
