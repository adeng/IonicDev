import {Page, NavParams, Modal} from 'ionic-framework/ionic';
import {StockService} from '../libs/stocks/stock-service';
import {AsyncKeyPipe} from '../libs/pipes/key-pipe';
import {AccountingPipe, TimestampPipe} from '../libs/pipes/formatting';
import {Http} from 'angular2/http';
import {DateRangeModal} from '../modals/date-modal';

enum Type {"ty=c&ta=0", "ty=l&ta=0", "ty=c&ta=1"};

@Page({
  templateUrl: 'app/stock-info/stock-info.html',
  pipes: [AsyncKeyPipe, AccountingPipe, TimestampPipe]
})

export class StockInfo {
  data: Promise<Object>;
  stock: StockService;
  ticker: string;
  modal: Modal;
  promise: Promise<string>;
  url: string;
  type: string = Type[0];
  range: string = "5d";
  
  constructor(navParams: NavParams, http: Http, modal: Modal) {
    this.ticker = navParams.get('stock');
    this.stock = new StockService();
    this.data = this.stock.getStockData(this.ticker, http);
    this.modal = modal;
    
    // this.url = "http://finviz.com/chart.ashx?t=" + this.ticker + "&" + this.type + "&p=" + this.range + "&s=l";
    this.url = "http://chart.finance.yahoo.com/z?s=" + this.ticker + "&t=" + this.range;
  }
  
  openDateRange() {
      this.modal.open(DateRangeModal, {date: this.range}).then( modalRef => {
          modalRef.onClose = data => {
              this.range = data;
              this.url = "http://chart.finance.yahoo.com/z?s=" + this.ticker + "&t=" + this.range;
          }
      });
  }
}
