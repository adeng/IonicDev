import {Http, Headers} from 'angular2/http';

export class StockService {
	data: Object;
	ticker: string;
	constructor() {
	}
	
	getStockData(ticker, http) {
		var promise = new Promise<Object>(function(resolve) {
			http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + ticker ).subscribe(
				data => resolve(data.json()),
				err => {
					http.get('/app/libs/stocks/out.dat').subscribe(
						res => {
							resolve(res.json());
						}
					);
				}
			);
		});
		
		return promise;
	}
    
    getTechnicalData(ticker, http, intra, numDays, dataPeriod, eType, eParam ) {
        var promise = new Promise<Object>(function(resolve) {
            let url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=";
            let params = {"Normalized": false};
            
            if( !intra )
                params['NumberOfDays'] = numDays;
            
            params['DataPeriod'] = dataPeriod;
            
            let elements = {"Symbol": ticker, "Type": eType}
            let param = [];
            if( eType == "sma" )
                param[0] = "period";
            else if( eType == "price" )
                param[0] = eParam;
            
            elements['Params'] = param;
            params['Elements'] = [elements];
            
            url += encodeURI(JSON.stringify(params));
            
            console.log(url);
            
			http.get( url ).subscribe(
				data => resolve(data.json().Elements[0].DataSeries),
				err => {
					http.get('/app/libs/stocks/data.dat').subscribe(
						res => {
							resolve(res.json().Elements[0].DataSeries);
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