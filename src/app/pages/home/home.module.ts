import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home.routing.module';
import { ButtonModule } from '../ui/button/button.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		HomeRoutingModule,
		CommonModule,
		NbCardModule,
		RouterModule,
		ButtonModule],
})
export class HomeModule { }
