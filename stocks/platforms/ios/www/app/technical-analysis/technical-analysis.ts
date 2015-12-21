import {Page, NavParams, NavController} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {StockService} from '../libs/stocks/stock-service';
import {RSIPipe, OscPipe} from '../libs/pipes/technicals';

@Page({
  templateUrl: 'app/technical-analysis/technical-analysis.html',
  pipes: [RSIPipe, OscPipe]
})

export class TechnicalAnalysis {
    ticker: string;
    nav: NavController;
    promise: Promise<Object>;
    rsi: number = 0;
    osc: number = 0;
    stop: number = 0;
    url: string;

    constructor(nav: NavController, params: NavParams, http: Http) {
        this.nav = nav;
        this.ticker = params.get('ticker');
        this.url = "http://finviz.com/chart.ashx?t=" + this.ticker + "&ty=c&ta=1&p=d&s=l";
        this.stock = params.get('stock-service');
        this.promise = this.stock.getTechnicalData(this.ticker, http, false, 31, "Day", "price", "ohlc").then( data => {
            this.rsi = this.calculateRSI(data.close.values);
            this.osc = this.calculateStochOsc(data.close.values);
            this.stop = this.calculateChandelierLoss(data.high.values, data.low.values, data.close.values);
        });
    }
    
    calculateChandelierLoss(highs, lows, closes) {
        let xdays = 22;
        let h = highs;
        h.splice(0, highs.length - xdays);
        
        let high = h[0];
        
        for(let i = 1; i < h.length; i++) {
            if(h[i] > high)
                high = h[i];
        }
        
        let atr = Math.max(h[h.length - 1] - lows[lows.length - 1], 
            Math.abs(h[h.length - 1] - closes[closes.length - 1]), 
            Math.abs(lows[lows.length - 1] - closes[closes.length - 1]));
        return high - atr * 3;
    }
    
    calculateStochOsc(closes) {
        let xdays = 14;
        let c = closes;
        c.splice(0, closes.length - xdays);
        
        let high = c[0];
        let low = c[0];
        for(let i = 1; i < c.length; i++) {
            if(c[i] > high)
                high = c[i];
            if(c[i] < low)
                low = c[i];
        }
        
        return 100*((c[c.length - 1] - low)/(high - low));
    }
    
    calculateRSI(closes) {
        let xdays = 14;
        let c = closes;
        c.splice(0, closes.length - (xdays + 1));
        
        let ups: Array<number> = new Array();
        let downs: Array<number> = new Array();
        
        for(let i = 1; i < c.length; i++) {
            if( c[i] - c[i-1] >= 0 ) {
                ups.push(c[i] - c[i-1]);
            } else {
                downs.push(c[i-1] - c[i]);
            }
        }
        
        let avgUps = 0;
        let avgDowns = 0;
        
        if( downs.length == 0 )
            return 100;
        else if( ups.length == 0 )
            return 0;
        else {
            for( let i = 0; i < downs.length; i++ ) {
                avgDowns += downs[i];
            }
            avgDowns /= 14;
            
            for( let i = 0; i < ups.length; i++ ) {
                avgUps += ups[i];
            }
            avgUps /= 14;
        }    
        
        let rsi = avgUps/avgDowns;
        return 100 - 100/(1 + rsi);
    }
}