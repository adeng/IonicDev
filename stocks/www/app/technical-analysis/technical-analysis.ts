import {Page, NavParams, NavController} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {StockService} from '../libs/stocks/stock-service';

@Page({
  templateUrl: 'app/technical-analysis/technical-analysis.html',
})

export class TechnicalAnalysis {
    ticker: string;
    nav: NavController;

    constructor(nav: NavController, params: NavParams, http: Http) {
        this.nav = nav;
        this.ticker = params.get('ticker');
        this.stock = params.get('stock-service');
        //         this.stock.getTechnicalData(this.ticker, http, false, 31, "Day", "price", "ohlc");
    }
}