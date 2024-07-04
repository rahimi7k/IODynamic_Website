import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliComponent } from './cli.component';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
	declarations: [CliComponent],
	imports: [
		CommonModule,
		DirectiveModule
	],
	exports: [CliComponent],

})
export class CliModule { }
