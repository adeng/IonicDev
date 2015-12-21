import {Page, Storage, SqlStorage, Modal, Popup} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {XMLParser} from '../libs/services/xmlparser';
import {TickerFilterPipe} from '../libs/pipes/filters';
import {FilterModal} from '../modals/filter-modal';

@Page({
    templateUrl: 'app/news/news.html',
    pipes: [TickerFilterPipe]
})

export class News {
    parse: XMLParser;
    news: Array<Object> = new Array();
    failed: number = 0;
    tickers: Array<string> = new Array();
    http: Http;
    modal: Modal;
    
    constructor(http: Http, modal: Modal) {
        this.storage = new Storage(SqlStorage, {name: 'stocks'});
        this.parse = new XMLParser();
        this.http = http;
        this.modal = modal;
        this.refresh();
    }
    
    openFilter() {
        console.log(this.tickers);
        this.modal.open(FilterModal, {tickers: this.tickers}).then( modalRef => {
            modalRef.onClose = data => {
                this.tickers = data;
                this.refresh();
            }
        });
    }
    
    refresh() {
        this.news = new Array();
        this.sendRequests('have', this.http);
        this.sendRequests('want', this.http);
        this.sendRequests('interested', this.http);
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
    
    getTickerIndex(ticker: string) {
        let index = -1;
        for( let i = 0; i < this.tickers.length; i++ )
            if( this.tickers[i].name == ticker )
                index = i;
        return index;
    }
    
    fillList(tickers: Array<string>, http: Http) {
        for(let i = 0; i < tickers.length; i++) {
            if( JSON.stringify(this.tickers).indexOf(tickers[i]) == -1)
                this.tickers.push({name: tickers[i], isChecked: true});
            else {
                if( !this.tickers[this.getTickerIndex(tickers[i])].isChecked )
                    continue;
            }
            
            this.parse.getRSS(http, "http://feeds.finance.yahoo.com/rss/2.0/headline?s=" + tickers[i] + "&region=US&lang=en-US", tickers[i]).then( data => {
                this.news = this.news.concat(data);
                
                this.news.sort(function(a, b) {
                    return b['date'] - a['date'];
                });
            });
            this.parse.getRSS(http, "http://seekingalpha.com/symbol/" + tickers[i] + ".xml", tickers[i]).then( data => {
                this.news = this.news.concat(data);
                
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
