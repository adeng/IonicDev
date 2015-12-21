import {Pipe} from 'angular2/core';

@Pipe({
	name: 'rsi'
})

export class RSIPipe {
	transform(value: any, args: string[]):any {
        let i = parseFloat(value);
        
        if( i >= 70 )
            return value + " (Overbought)";
        else if( i <= 30 )
            return value + " (Oversold)";
        else
            return value + " (Normal)";
	}
}

@Pipe({
	name: 'osc'
})

export class OscPipe {
	transform(value: any, args: string[]):any {
        let i = parseFloat(value);
        
        if( i >= 80 )
            return value + " (Overbought)";
        else if( i <= 20 )
            return value + " (Oversold)";
        else
            return value + " (Normal)";
	}
}