import {Page, NavParams, Modal} from 'ionic-framework/ionic';
import {StockService} from '../libs/stocks/stock-service';
import {AsyncKeyPipe} from '../libs/pipes/key-pipe';
import {AccountingPipe, TimestampPipe} from '../libs/pipes/formatting';
import {Http} from 'angular2/http';
import {OptionsModal} from '../modals/options-modal';

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

    /**
     * 0: Time
     * 1: Type
     * 2: Moving Avg
     * 3: Exp Moving Avg
     * 4: Technical Indicators 1
     * 5: Technical Indicators 2
     */
    chartParams: Array<any> = ["5d", "l", [], [], []];
  
    constructor(navParams: NavParams, http: Http, modal: Modal) {
        this.ticker = navParams.get('stock');
        this.stock = new StockService();
        this.data = this.stock.getStockData(this.ticker, http);
        this.modal = modal;

        // this.url = "http://finviz.com/chart.ashx?t=" + this.ticker + "&" + this.type + "&p=" + this.chartParams[0] + "&s=l";
        this.genChart();
    }

    openOptions() {
        this.modal.open(OptionsModal, {options: this.chartParams}).then( modalRef => {
            modalRef.onClose = data => {
                this.chartParams = data;
                this.genChart();
            }
        });
    }

    genChart() {
        this.url = "http://chart.finance.yahoo.com/z?s=" + this.ticker + "&z=s&t=" 
            + this.chartParams[0] + "&q=" + this.chartParams[1];
        
        if( this.chartParams[2].length > 0 || this.chartParams[3].length > 0 || this.chartParams[4].length > 0) {
            this.url += "&p=";
            let a = this.chartParams[2].concat(this.chartParams[3], this.chartParams[4]);
            
            for( let i = 0; i < a.length; i++ ) {
                this.url += a[i];
                this.url += (i == a.length - 1) ? "" : ",";
            }
        }
    }
}
