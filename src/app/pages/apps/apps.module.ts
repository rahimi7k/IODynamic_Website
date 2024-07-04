import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';
import { FollowergirComponent } from './followergir/followergir.component';
import { MembergirComponent } from './membergir/membergir.component';
import { DubsmanComponent } from './dubsman/dubsman.component';
import { MobilebankComponent } from './mobilebank/mobilebank.component';


import {
	NbCardModule,
	NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
	declarations: [AppsComponent, FollowergirComponent, MembergirComponent, DubsmanComponent, MobilebankComponent],
	imports: [
		CommonModule,
		AppsRoutingModule,
		NbCardModule,
		ThemeModule,
		NbIconModule,
	],
})
export class AppsModule { }
