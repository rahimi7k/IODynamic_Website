import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
	declarations: [DialogComponent],
	imports: [
		CommonModule,
		DirectiveModule,
	],
	exports: [DialogComponent],
})
export class DialogModule { }
