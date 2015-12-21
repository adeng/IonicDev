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
    tickers: Array<Object> = new Array();
    markets: Array<Object> = [{name: "Deals", isChecked: true, urls: ["http://feeds.reuters.com/news/deals"]}, {name: "Economy", isChecked: true, urls: ["http://feeds.reuters.com/news/economy"]}, {name: "Global Markets", isChecked: true, urls: ["http://feeds.reuters.com/reuters/globalmarketsNews"]}, {name: "IPOs", isChecked: true, urls: ["http://www.reuters.com/rssFeed/newIssuesNews"]}, {name: "Regulatory News", isChecked: true, urls: ["http://feeds.reuters.com/reuters/governmentfilingsNews"]}, {name: "US Markets", isChecked: true, urls: ["http://feeds.reuters.com/news/usmarkets"]}];
    sectors: Array<Object> = [{name: "Basic Materials", isChecked: true, urls: ["http://feeds.reuters.com/reuters/basicmaterialsNews"]}, {name: "Cyclical Consumer Goods", isChecked: true, urls: ["http://feeds.reuters.com/reuters/cyclicalconsumergoodsNews"]}, {name: "Energy", isChecked: true, urls: ["http://feeds.reuters.com/reuters/USenergyNews"]}, {name: "Environment", isChecked: true, urls: ["http://feeds.reuters.com/reuters/environment"]}, {name: "Financials", isChecked: true, urls: ["http://feeds.reuters.com/reuters/financialsNews"]}, {name: "Healthcare", isChecked: true, urls: ["http://feeds.reuters.com/reuters/UShealthcareNews"]}, {name: "Industrials", isChecked: true, urls: ["http://feeds.reuters.com/reuters/industrialsNews"]}, {name: "Media Diversified", isChecked: true, urls: ["http://feeds.reuters.com/reuters/USmediaDiversifiedNews"]}, {name: "Non-Cyclical Consumer Goods", isChecked: true, urls: ["http://feeds.reuters.com/reuters/noncyclicalconsumergoodsNews"]}, {name: "Technology", isChecked: true, urls: ["http://feeds.reuters.com/reuters/technologysectorNews"]}, {name: "Utilities", isChecked: true, urls: ["http://feeds.reuters.com/reuters/utilitiesNews"]}];
    http: Http;
    modal: Modal;
    display: string;
    
    constructor(http: Http, modal: Modal) {
        this.storage = new Storage(SqlStorage, {name: 'stocks'});
        this.parse = new XMLParser();
        this.http = http;
        this.modal = modal;
        this.display = "markets";
        this.refresh();
    }
    
    openFilter() {
        let obj = new Object();
        switch(this.display) {
            case "markets":
                obj = {tags: this.markets};
                break;
            case "sectors":
                obj = {tags: this.sectors};
                break;
            case "watchlist":
                obj = {tags: this.tickers};
                break;
        }
        this.modal.open(FilterModal, obj).then( modalRef => {
            modalRef.onClose = data => {
                this.refresh(this.display);
            }
        });
    }
    
    refresh(section: string = "undefined") {
        if( this.display == section )
            return;
            
        if(section == "undefined")
            section = this.display
          
        this.news = new Array();
        this.failed = 0;
        
        switch(section) {
            case "watchlist":
                this.getTickers('have', this.http);
                this.getTickers('want', this.http);
                this.getTickers('interested', this.http);
                break;
            case "sectors":
            case "markets":
                this.fillList(this.http, section);
                break;            
        }
    }
    
    getTickers(list: string, http: Http) {
        this.storage.get(list).then( tickers => {
            if( tickers == null )
                this.failed++;
            else {
                let ticks = tickers.split(",");
                
                for(let i = 0; i < ticks.length; i++) {
                    if( JSON.stringify(this.tickers).indexOf(ticks[i]) == -1) {
                        let tickerUrls = ["http://feeds.finance.yahoo.com/rss/2.0/headline?s=" + ticks[i] + "&region=US&lang=en-US", "http://seekingalpha.com/symbol/" + ticks[i] + ".xml"];
                        this.tickers.push({name: ticks[i], isChecked: true, urls: tickerUrls});
                    }
                }
                this.fillList(http, "watchlist");
            }                
        });
    }
    
    fillList(http: Http, section: string) {
        let list: Array<Object>;
        
        switch(section) {
            case "markets":
                list = this.markets;
                break;
            case "sectors":
                list = this.sectors;
                break;
            case "watchlist":
                list = this.tickers;
                break;
        }
        
        for(let i = 0; i < list.length; i++) {
            if( !list[i].isChecked )
                continue;
            
            for(let j = 0; j < list[i].urls.length; j++) {
                this.parse.getRSS(http, list[i].urls[j], list[i].name).then( data => {
                    this.news = this.news.concat(data);
                    this.news.sort(function(a, b) {
                        return b['date'] - a['date'];
                    });
                })
            }
        }
    }
    
    openStory(url: string) {
        console.log(url);
    }
}
