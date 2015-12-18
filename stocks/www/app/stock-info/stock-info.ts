import {Page, NavParams} from 'ionic-framework/ionic';
import {Stock} from '../libs/stocks/stock';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'app/stock-info/stock-info.html',
})

export class StockInfo {
  data: Object;
  stock: Stock;
  
  name: Promise<string>;
  
  constructor(navParams: NavParams, http: Http) {
    this.stock = new Stock(navParams.get('stock'), http);
    this.stock.getStockData(navParams.get('stock'), http).then(function(val) {
      this.data = val;
      
      this.name = new Promise<string>(function(resolve) {
        resolve(this.data.Name);
      });
    });
  }
}
