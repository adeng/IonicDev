import {Page, NavParams} from 'ionic-framework/ionic';
import {StockService} from '../libs/stocks/stock-service';
import {KeyPipe} from '../libs/pipes/key-pipe';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'app/stock-info/stock-info.html',
  pipes: [KeyPipe]
})

export class StockInfo {
  data: Promise<Object>;
  stock: StockService;
  ticker: string;
  promise: Promise<string>;
  
  constructor(navParams: NavParams, http: Http) {
    this.ticker = navParams.get('stock');
    this.stock = new StockService();
    this.data = this.stock.getStockData(this.ticker, http);
  }
}
