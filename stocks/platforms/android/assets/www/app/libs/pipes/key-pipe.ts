import {Pipe} from 'angular2/core';

@Pipe({
	name: 'key',
	pure: false
})

export class AsyncKeyPipe {
    private fetchedPromise: Promise<Object>;
    private result: any;
    
	transform(value: Promise<Object>, args: string[]):any {
        if(!this.fetchedPromise) {
            this.fetchedPromise = value
                .then((obj) => this.result = obj[args[0]] );
        }
        return this.result;
	}
}