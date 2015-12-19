import {Page, NavParams} from 'ionic-framework/ionic';
import {StockService} from '../libs/stocks/stock-service';
import {AsyncKeyPipe} from '../libs/pipes/key-pipe';
import {AccountingPipe} from '../libs/pipes/accounting';
import {Http} from 'angular2/http';

enum Type {"ty=c&ta=0", "ty=l&ta=0", "ty=c&ta=1"};

enum Range {"d", "w", "m"};

@Page({
  templateUrl: 'app/stock-info/stock-info.html',
  pipes: [AsyncKeyPipe, AccountingPipe]
})

export class StockInfo {
  data: Promise<Object>;
  stock: StockService;
  ticker: string;
  promise: Promise<string>;
  url: string;
  type: string = Type[0];
  range: string = Range[0];
  
  constructor(navParams: NavParams, http: Http) {
    this.ticker = navParams.get('stock');
    this.stock = new StockService();
    this.data = this.stock.getStockData(this.ticker, http);
    
    // this.url = "http://finviz.com/chart.ashx?t=" + this.ticker + "&" + this.type + "&p=" + this.range + "&s=l";
    this.url = "http://chart.finance.yahoo.com/z?s=" + this.ticker;
  }
}
