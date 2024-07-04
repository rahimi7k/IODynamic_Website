import { Pipe, PipeTransform } from '@angular/core';
import { StringUtils } from '../Utils/StringUtils';
import { Setting } from '../../pages/setting/setting.service';

@Pipe({
	name: 'numberPipe', // DO NOT USE '-' DASH IN NAME, ANGULAR ERROR
})
export class NumberPipe implements PipeTransform {

	constructor() { }

	public transform(figures: number): string {
		return StringUtils.formatNumbers(figures, Setting.getLanguage());
	}

}