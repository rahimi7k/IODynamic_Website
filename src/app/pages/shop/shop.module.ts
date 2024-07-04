import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { PopUpModule } from '../ui/popup/popup.module';
import { ButtonModule } from '../ui/button/button.module';
import { NbCardModule } from '@nebular/theme';


@NgModule({
	declarations: [ShopComponent],
	imports: [
		CommonModule,
		ShopRoutingModule,
		NbCardModule,
		ButtonModule,
		PopUpModule],
})
export class ShopModule { }
