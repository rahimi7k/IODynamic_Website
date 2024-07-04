import { Pipe, PipeTransform } from '@angular/core';
import { StringUtils } from '../Utils/StringUtils';

@Pipe({
	name: 'splitStringByLengthPipe', // DO NOT USE '-' DASH IN NAME, ANGULAR ERROR
})
export class SplitStringByLength implements PipeTransform {

	constructor() { }

	public transform(text: string, maxLength: number): string {
		return StringUtils.splitStringByLength(text, maxLength);
	}

}