import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArrayList } from '../../../@core/Utils/ArrayList';
import { Color } from '../color';

@Injectable({
	providedIn: 'root',
})
export class Cli {

	public static cliLayerSubject = new Subject();
	public static cliMessageSubject = new Subject();
	private static readonly Messages: ArrayList<Cli.Message> = new ArrayList<Cli.Message>();

	public static setMessage(msg: Cli.Message): void {
		Cli.Messages.add(msg);
		Cli.cliMessageSubject.next(msg);
	}


	public static getMessages(): ArrayList<Cli.Message> {
		return Cli.Messages;
	}

}


export namespace Cli {

	export class Message {
		public text: string;
		public color: Color.Color;
	}

}
