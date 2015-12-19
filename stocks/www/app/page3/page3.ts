import {Page, Storage, SqlStorage, NavController} from 'ionic-framework/ionic';
import {StockInfo} from '../stock-info/stock-info';
import {AddTicker} from '../add-ticker/add-ticker';

@Page({
  templateUrl: 'app/page3/page3.html'
})
export class Page3 {
  display: string = "have";
  tickers: Array<string>;
  numTicks: number = 0;
  nav: NavController;
  storage: Storage;
  
  constructor(nav: NavController) {
    this.nav = nav;
    this.storage = new Storage(SqlStorage, {name: 'stocks'});
    this.fillList('have');
  }
  
  fillList(display: string) {
    this.storage.get(display).then((values) => {
      if( values == null ) {
        this.tickers = new Array<string>();
      } else {
        this.tickers = values.split(",");  
      }
      this.numTicks = this.tickers.length;
    });
  }
  
  openStockInfo(event, stock) {
    this.nav.push(StockInfo, {
      stock: stock
    });
  }
  
  openTicker() {
    console.log("Here");
    this.nav.push(AddTicker);
  }
}
