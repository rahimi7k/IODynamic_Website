import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipe } from './safe.pipe';
import { DatePipe } from './date.pipe';
import { NumberPipe } from './number.pipe';
import { SplitStringByLength } from './split-string-by-length';

/*
const PIPES = [
	SafePipe,
	DatePipe,
];
*/

@NgModule({
	declarations: [SafePipe, DatePipe, NumberPipe, SplitStringByLength],
	exports: [SafePipe, DatePipe, NumberPipe, SplitStringByLength],
	imports: [CommonModule],
})
export class PipeModule { }




/*
@NgModule({
	declarations: [...PIPES],
	exports: [...PIPES],
})
export class PipeModule {
	static forRoot(): ModuleWithProviders<PipeModule> {
		return {
			ngModule: PipeModule,
		};
	}
}
*/
//For this, When import use this: 	imports:[PipeModule.forRoot()]

