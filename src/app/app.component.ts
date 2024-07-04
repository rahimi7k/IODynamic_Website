import { Component, OnInit, AfterViewInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { SeoService } from './@core/Utils/seo.service';
import { Setting } from './pages/setting/setting.service';
import { NbThemeService } from '@nebular/theme';
import { Language } from './@theme/language/language';
import { LanguageEN } from './@theme/language/language_en';
import { LanguageFA } from './@theme/language/language_fa';
import { IndexDBHandler } from './@core/IndexDB/IndexDBHandler';
import { StorageUtils } from './@core/Utils/StorageUtils';
import { App } from './app.service';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>
				<app-toast></app-toast>`,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    public static render: Renderer2;
    public static pageHeaderImgHeight: number = 0;
    public static languageName: string;
    public static language: Language;


    constructor(private seoService: SeoService, private element: ElementRef, renderer: Renderer2, private themeService: NbThemeService) {
        AppComponent.render = renderer;
        this.themeService.changeTheme(Setting.getTheme());

        console.log(window.location.pathname);
        if (window.location.pathname.includes("/fa/")) {
            AppComponent.languageName = "fa";
            StorageUtils.put(StorageUtils.Setting, "Language", "fa");
        } else if (window.location.pathname.includes("/en/")) {
            AppComponent.languageName = "en";
            StorageUtils.put(StorageUtils.Setting, "Language", "en");
        } else {
            AppComponent.languageName = Setting.getLanguage();
        }

        if (AppComponent.languageName === "fa") {
            AppComponent.language = new LanguageFA();
        } else {
            AppComponent.language = new LanguageEN();
        }
    }

    ngOnInit() {
        App.initialApp();
        this.initialHtmlVariables();
        this.InitialDatabase();
        this.seoService.trackCanonicalChanges();
    }

    ngAfterViewInit() {
    }



    private async InitialDatabase(): Promise<void> {
        await IndexDBHandler.init();
    }

    private initialHtmlVariables(): void {
        this.element.nativeElement.style.setProperty('--global-font', Setting.getFont());
    }

}
