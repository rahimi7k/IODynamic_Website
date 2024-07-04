import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './popup.component';
import { SelectModule } from '../select/select.module';
import { SelectComponent } from '../select/select.component';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
	declarations: [PopUpComponent],
	entryComponents: [SelectModule],
	providers: [SelectComponent],
	imports: [
		CommonModule,
		SelectModule,
		DirectiveModule],
	exports: [PopUpComponent],
})
export class PopUpModule { }
