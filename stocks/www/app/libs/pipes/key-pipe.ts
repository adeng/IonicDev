import {Pipe} from 'angular2/core';

@Pipe({
	name: 'key',
	pure: false
})

export class KeyPipe {
	transform(value: Object, args: string[]):string {
		return value[args[0]];
	}
}