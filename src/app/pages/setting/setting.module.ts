import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SettingRoutingModule } from './setting.routing.module';
import { ButtonModule } from '../ui/button/button.module';

@NgModule({
	declarations: [SettingComponent],
	imports: [
		SettingRoutingModule,
		ThemeModule,
		NbCardModule,
		CommonModule,
		RouterModule,
		ButtonModule],
})
export class SettingModule { }
