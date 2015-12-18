import {Page, NavParams} from 'ionic-framework/ionic';
import {Stock} from '../libs/stocks/stock';

@Page({
  templateUrl: 'app/stock-info/stock-info.html',
})

export class StockInfo {
  stock: Stock;
  constructor(navParams: NavParams) {
    this.stock = new Stock(navParams.get('stock'));
    // this.stock = navParams.get('stock');
  }
}
