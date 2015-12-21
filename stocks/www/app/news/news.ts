import {Page, Storage, SqlStorage, Popup} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {XMLParser} from '../libs/services/xmlparser';
import {TickerFilterPipe} from '../libs/pipes/filters';

@Page({
  templateUrl: 'app/news/news.html',
  pipes: [TickerFilterPipe]
})
export class News {
    parse: XMLParser;
    news: Array<Object> = new Array();
    failed: number = 0;
    tickers: Array<string> = new Array();
    
    constructor(http: Http) {
        this.storage = new Storage(SqlStorage, {name: 'stocks'});
        this.parse = new XMLParser();
        
        this.sendRequests('have', http);
        this.sendRequests('want', http);
        this.sendRequests('interested', http);
    }
    
    sendRequests(list: string, http: Http) {
        this.storage.get(list).then( tickers => {
            if( tickers == null )
                this.failed++;
            else {
                let ticks = tickers.split(",");
                this.fillList(ticks, http);
            }                
        });
    }
    
    fillList(tickers: Array<string>, http: Http) {
        for(let i = 0; i < tickers.length; i++) {
            this.parse.getRSS(http, "http://feeds.finance.yahoo.com/rss/2.0/headline?s=" + tickers[i] + "&region=US&lang=en-US", tickers[i]).then( data => {
                this.news = this.news.concat(data);
                
                if(this.tickers.indexOf(this.news.ticker) == -1)
                    this.tickers.push(this.news.ticker);
                
                this.news.sort(function(a, b) {
                    return b['date'] - a['date'];
                });
            });
            this.parse.getRSS(http, "http://seekingalpha.com/symbol/" + tickers[i] + ".xml", tickers[i]).then( data => {
                this.news = this.news.concat(data);
                
                if(this.tickers.indexOf(this.news.ticker) == -1)
                    this.tickers.push(this.news.ticker);
                    
                this.news.sort(function(a, b) {
                    return b['date'] - a['date'];
                });
            });
        }
    }
    
    openStory(url: string) {
        console.log(url);
    }
}
