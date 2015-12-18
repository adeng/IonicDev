import {Http, Headers} from 'angular2/http';

export class Stock {
	data: Object;
	ticker: string;
	constructor(ticker: string, http: Http) {
		this.ticker = ticker;
		// this.http.get('/app/libs/stocks/out.dat').subscribe(
		// 	data => {
		// 		let d = data.text();
		// 		this.data = JSON.parse(d.substring(2, d.length - 1));
		// 	},
		// 	err => console.log(err),
		// 	() => console.log(this.data)
		// );
	}
	
	getStockData(ticker, http) {
		var promise = new Promise<Object>(function(resolve) {
			http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + ticker + '&callback=d').subscribe(
				data => {
					console.log("Here");
					let d = data.text();
					resolve(JSON.parse(d.substring(2, d.length - 1)));
				},
				err => {
					console.log("err");
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