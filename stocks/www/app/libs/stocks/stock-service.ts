import {Http, Headers} from 'angular2/http';

export class StockService {
	data: Object;
	ticker: string;
	constructor() {
	}
	
	getStockData(ticker, http) {
		var promise = new Promise<Object>(function(resolve) {
			http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + ticker + '&callback=d').subscribe(
				data => {
					let d = data.text();
					resolve(JSON.parse(d.substring(2, d.length - 1)));
				},
				err => {
					http.get('/app/libs/stocks/out.dat').subscribe(
						res => {
							let d = res.text();
							resolve(JSON.parse(d.substring(2, d.length - 1)));
						}
					);
				}
			);
		});
		
		return promise;
	}
	
	/* Getters */	
	getTicker() { return this.ticker; }
}