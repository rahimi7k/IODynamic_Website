import { RouterModule, Routes, PreloadAllModules, ActivatedRoute, Route, UrlSegment } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Setting } from './setting/setting.service';


function onlyLanguageMatcher(urlSegments: UrlSegment[]) {
	if (urlSegments[0].path.startsWith("fa")) {
		if (Setting.getLanguage() != "fa") {
			window.document.location.href = "/fa/home"
		}

		var languageSegment: UrlSegment = new UrlSegment("fa", {});
		var componentSegment: UrlSegment = new UrlSegment("home", {});
		urlSegments = [languageSegment, componentSegment];
		return { consumed: urlSegments };

	} else if (urlSegments[0].path.startsWith("en")) {
		if (Setting.getLanguage() != "en") {
			window.document.location.href = "/en/home"
		}
		var languageSegment: UrlSegment = new UrlSegment("en", {});
		var componentSegment: UrlSegment = new UrlSegment("home", {});
		urlSegments = [languageSegment, componentSegment];
		return { consumed: urlSegments };
	}

	return null;
}


function matcher(urlSegments: UrlSegment[], url: string) {
	console.log(urlSegments);
	if (urlSegments.length === 0) {
		var languageSegment: UrlSegment = new UrlSegment(Setting.getLanguage(), {});
		var componentSegment: UrlSegment = new UrlSegment("home", {});
		urlSegments = [languageSegment, componentSegment];
		return { consumed: urlSegments };
	}

	if (urlSegments.length === 1) {
		if ("/" + urlSegments[0].path === url) {
			var languageSegment: UrlSegment = new UrlSegment(Setting.getLanguage(), {});
			urlSegments.splice(0, 0, languageSegment);
			return { consumed: urlSegments };

		} else if (urlSegments[0].path.startsWith("fa") || urlSegments[0].path.startsWith("en")) {
			var languageSegment: UrlSegment = new UrlSegment(Setting.getLanguage(), {});
			var componentSegment: UrlSegment = new UrlSegment("home", {});
			urlSegments = [languageSegment, componentSegment];
			return { consumed: urlSegments };

		}

	} else {
		var path0: string = urlSegments[0].path;
		if (path0.startsWith("en") || path0.startsWith("fa")) {

			if (url == "/" + urlSegments[1].path) {
				var languageSegment: UrlSegment = new UrlSegment(Setting.getLanguage(), {});
				var componentSegment: UrlSegment = new UrlSegment(urlSegments[1].path, {});
				urlSegments = [languageSegment, componentSegment];
				return { consumed: urlSegments };
			}

		} else { //No Language detect, we add
			var url: string = "";
			for (var i: number = 0; i < urlSegments.length; i++) {
				url = url + urlSegments[i].path + "/";
			}
			window.document.location.href = Setting.getLanguage() + "/" + url;
		}

	}

	return null;
}


const routes: Routes = [{
	path: '',
	component: PagesComponent,

	children: [
		{
			// path: '/home',
			// component: HomeComponent,
			matcher: (urlSegments: UrlSegment[]) => {
				if (urlSegments.length === 1) {
					var urlSegment: any/*{ consumed: UrlSegment[] }*/ = onlyLanguageMatcher(urlSegments);
					if (urlSegment != null) {
						return urlSegment;
					}
				}
				return matcher(urlSegments, "/home");

			}, // default was matcher: matcher - with only 1 parameter -- saeed intelligence
			loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
		},

		{
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/apps") },
			loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
		},

		{
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/shop") },
			loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
		},
		{
			// path: 'contact-us',
			// component: ContactUsComponent,
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/contact-us") },
			loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
		},
		{
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/api") },
			loadChildren: () => import('./api/api.module').then(m => m.ApiModule),
		},
		{
			// path: 'setting',
			// component: SettingComponent,
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/setting") },
			loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
		},
		{
			matcher: (urlSegments: UrlSegment[]) => { return matcher(urlSegments, "/policy") },
			loadChildren: () => import('../auth/policy/policy.module').then(m => m.PolicyModule),
		},
	],

}];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}
