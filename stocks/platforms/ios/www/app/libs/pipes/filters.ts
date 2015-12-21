import {Pipe} from 'angular2/core';

@Pipe({
	name: 'tickerfilter'
})

export class TickerFilterPipe {
	transform(value: any, args: string[]):any {
        let total = value;
        total.filter(function(a) {
            return args[0].indexOf(a.ticker) != -1
        });
        return total;
	}
}