import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { AppsComponent } from './apps.component';
import { FollowergirComponent } from './followergir/followergir.component';
import { MembergirComponent } from './membergir/membergir.component';
import { DubsmanComponent } from './dubsman/dubsman.component';
import { MobilebankComponent } from './mobilebank/mobilebank.component';


const routes: Routes = [{
	path: '',
	component: AppsComponent,
	children: [
		{
			path: 'followergir',
			component: FollowergirComponent,
		},
		{
			path: 'membergir',
			component: MembergirComponent,
		},
		{
			path: 'dubsman',
			component: DubsmanComponent,
		},
		{
			path: 'mobilebank',
			component: MobilebankComponent,
		},
	],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AppsRoutingModule { }
