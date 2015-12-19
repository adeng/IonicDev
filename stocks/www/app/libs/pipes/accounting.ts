import {Pipe} from 'angular2/core';

@Pipe({
	name: 'accounting'
})

export class AccountingPipe {
    
	transform(value: any, args: string[]):any {
        let v = value;
        if( typeof value != "number" )
            v = parseFloat(value);
        
        v = Math.round(v);
        let str: string;
        
        if( v >= 1000000000000 )
            str = (v / 1000000000000).toFixed(2) + "T";
        else if( v >= 1000000000 )
            str = (v / 1000000000).toFixed(2) + "B";
        else if( v >= 1000000 )
            str = (v / 1000000).toFixed(2) + "M";
        else if( v >= 1000 )
            str = (v / 1000).toFixed(2) + "K";
        else
            str = v;
            
        if( v < 0 ) {
            str = "(" + str + ")";
        }
        
        return str;
	}
}