import {Pipe} from 'angular2/core';

@Pipe({
	name: 'chartDate'
})

export class DateModalPipe {
	transform(value: any, args: string[]):any {
        switch(value) {
            case "1d":
                return "One Day";
            case "5d":
                return "Five Days";
            case "3m":
                return "Three Months";
            case "6m":
                return "Six Months";
            case "1y":
                return "One Year";
            case "2y":
                return "Two Years";
            case "5y":
                return "Five Years";
            case "my":
                return "Maximum";
        }
	}
}

@Pipe({
    name: 'chartType'
})

export class TypeModalPipe {
	transform(value: any, args: string[]):any {
        switch(value) {
            case "c":
                return "Candlestick";
            case "l":
                return "Line";
            case "b":
                return "Bar";
        }
	}
}