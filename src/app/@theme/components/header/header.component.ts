import { Component, HostListener, Renderer2 } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/Utils';
import { Subject } from 'rxjs';
import { Setting } from '../../../pages/setting/setting.service';
import { Header } from './header.service';
import { ArrayList } from '../../../@core/Utils/ArrayList';
import { Main } from '../../../main';

@Component({
	selector: 'app-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: './header.component.html',
})
export class HeaderComponent extends Main {

	private clickOnSelect: boolean = false;
	private destroy$: Subject<void> = new Subject<void>();

	public readonly THEMES = Setting.THEMES;
	public readonly LANGUAGES = Setting.LANGUAGES;

	private static menuItems: ArrayList<HTMLElement> = new ArrayList<HTMLElement>();
	private menuItemsSpan: ArrayList<HTMLElement> = new ArrayList<HTMLElement>();
	private nbSideBar: HTMLElement;
	private divContainer: HTMLElement;
	public static hasClickOnPage: boolean = false;

	constructor(private sidebarService: NbSidebarService,
		private menuService: NbMenuService,
		private themeService: NbThemeService,
		private layoutService: LayoutService,
		private render: Renderer2) {
		super();
	}



	ngOnInit(): void {
		super.ngOnInit();
		// this.currentTheme = this.themeService.currentTheme;
		/*
		this.themeService.onThemeChange()
		  .pipe(
			map(({ name }) => name),
			takeUntil(this.destroy$),
		  )
		  .subscribe(themeName => this.currentTheme = themeName);
		  */
	}


	public ngAfterViewInit(): void {
		this.updateSideBarStatus();

		/*
		this.sidebarService.onToggle().subscribe((a) => {
		  console.log("toggle:", a);
		});
	
		this.sidebarService.onExpand().subscribe((a) => {
		  console.log("expand: ", a);
		});
	
		this.sidebarService.onCollapse().subscribe((a) => {
		  console.log("Collapse: ", a);
		});
	
		this.sidebarService.onCompact().subscribe((a) => {
		  console.log("Compact: ", a);
		});
	
		this.sidebarService.getSidebarResponsiveState("menu-sidebar").subscribe((a) => {
		  console.log("getSidebarState: ", a);
		});
		*/


		this.nbSideBar = (<HTMLScriptElement[]><any>document.getElementsByTagName("nb-sidebar"))[0];
		var menuItemsElemenets = document.getElementsByClassName("menu-item");
		for (let i = 0; i < menuItemsElemenets.length; i++) {

			HeaderComponent.menuItems.add((<HTMLScriptElement[]><any>menuItemsElemenets)[i]);
		}

		for (let i = 0; i < HeaderComponent.menuItems.length(); i++) {
			this.menuItemsSpan.add((<HTMLScriptElement[]><any>HeaderComponent.menuItems.get(i).getElementsByTagName("span"))[0]);
		}

		var layouContainer = (<HTMLScriptElement[]><any>document.getElementsByClassName("layout-container"))[0];
		this.divContainer = this.render.createElement("div");
		this.render.setProperty(this.divContainer, "id", "Menu_Float_Support");
		this.render.appendChild(layouContainer, this.divContainer);
		this.render.setStyle(this.divContainer, "width", "0");
		this.render.setStyle(this.divContainer, "display", "block");
		this.render.setStyle(this.divContainer, "direction", "ltr");
		this.render.setStyle(this.divContainer, "text-align", "left");
		this.nbSideBar.parentNode.insertBefore(this.divContainer, this.nbSideBar.nextSibling);
	}


	ngOnDestroy(): void {
		super.ngOnInit();
		this.destroy$.next();
		this.destroy$.complete();
	}



	public toggleSidebar(): boolean {
		this.sidebarService.toggle(true, 'menu-sidebar');
		this.layoutService.changeLayoutSize();
		return false;
	}


	public navigateHome() {
		this.menuService.navigateHome();
		return false;
	}



	public click(select: string) {
		let p = document.getElementById(select);
		if (this.clickOnSelect === false) {
			setTimeout(() => {
				this.clickOnSelect = true;
				p.click();
			}, 10);
		} else {
			this.clickOnSelect = false;
		}

	}


	public rawTheme(themeName: string): string {
		if (themeName.includes("-fa")) {
			themeName = themeName.replace("-fa", "");
		} else if (themeName.includes("-en")) {
			themeName = themeName.replace("-en", "");
		}
		return themeName;
	}


	private updateSideBarStatus(): void {
		this.sidebarService.getSidebarState("menu-sidebar").subscribe(status => {
			if (Header.sideBarStatus !== status) {
				Header.sideBarOldStatus = Header.sideBarStatus === "" ? status : Header.sideBarStatus;
				Header.sideBarStatus = status;
			} else {
				Header.sideBarOldStatus = Header.sideBarStatus;
			}
		});
	}

	@HostListener('window:resize', ['$event']) public onResize() {
		this.updateSideBarStatus();
	}


	@HostListener('document:click', ['$event']) onClick(event) {

		this.updateSideBarStatus();

		if (Header.sideBarButtonElement == null || Header.menuElement == null) {
			Header.sideBarButtonElement = document.getElementById("Header_Menu_Button");
			Header.menuElement = (<HTMLScriptElement[]><any>document.getElementsByClassName("menu-sidebar"))[0];
		}

		if (Header.sideBarButtonElement == null || Header.menuElement == null) {
			return;
		}

		if (!Header.sideBarButtonElement.contains(event.target) && !Header.menuElement.contains(event.target)) {

			if (window.innerWidth < 1200) {
				if (Header.sideBarStatus === "expanded") {
					Header.sideBarButtonElement.click();
				}
			}
		} else {
			if (Header.sideBarStatus === "expanded" && Header.sideBarOldStatus !== "expanded") {
				this.openMenu();
			} else if (Header.sideBarStatus !== "expanded" && Header.sideBarOldStatus === "expanded") {
				this.closeMenu();
			}
		}

	}



	private openMenu(): void {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (w > 575 && w < 1200) {
			this.render.setStyle(this.divContainer, "width", "56px");
		}

		for (let i = 0; i < HeaderComponent.menuItems.length(); i++) {
			this.menuItemsSpan.get(i).style.visibility = "hidden";
			HeaderComponent.menuItems.get(i).style.borderBottom = "1px solid transparent";
		}
		setTimeout(() => {
			for (let i = 0; i < HeaderComponent.menuItems.length(); i++) {
				this.menuItemsSpan.get(i).style.visibility = "visible";
			}
		}, 40);
		setTimeout(() => {
			HeaderComponent.updateMenuBorderBottom();
		}, 150);
	}


	private closeMenu(): void {
		this.render.setStyle(this.divContainer, "width", "0");
	}


	public static updateMenuBorderBottom(): void {
		for (let i = 0; i < HeaderComponent.menuItems.length(); i++) {
			if (Setting.getTheme() === "default") {
				HeaderComponent.menuItems.get(i).style.borderBottom = "1px solid #edf1f7";
			} else if (Setting.getTheme() === "dark") {
				HeaderComponent.menuItems.get(i).style.borderBottom = "1px solid #151a30";
			} else if (Setting.getTheme() === "cosmic") {
				HeaderComponent.menuItems.get(i).style.borderBottom = "1px solid #1b1b38";
			}
		}
	}

}
