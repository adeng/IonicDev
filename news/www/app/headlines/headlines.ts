import {Page} from 'ionic-framework/ionic';
import {XMLParser} from '../libs/services';
import {AsyncKeyPipe} from '../libs/pipes';
import {NewsBox} from '../libs/components/posts';
import {Http} from 'angular2/http';

@Page({
    templateUrl: 'app/headlines/headlines.html'
})
export class Headlines {
    parser;
    data;
    headers;
    numItems: number = 5;
    // Put this in a JSON eventually
    categories: Array<Object> = [{name: "News", url: "http://dailybruin.com/category/news/feed/"}, {name: "Sports", url: "http://dailybruin.com/category/sports/feed/"}, {name: "A&E", url: "http://dailybruin.com/category/arts-entertainment/feed/"}, {name: "Opinion", url: "http://dailybruin.com/category/opinion/feed/"}, {name: "Radio", url: "http://dailybruin.com/category/radio/feed/"}, {name: "Video", url: "http://dailybruin.com/category/video/feed/"}];
    
    
    constructor(http: Http) {
        this.parser = new XMLParser();
        
        this.data = new Array();
        this.headers = new Array();
        for(let i = 0; i < this.categories.length; i++) {
            let obj = {header: this.categories[i].name};
            let obj.items = new Array();
            let obj.promise = this.parser.getRSS(http, this.categories[i].url, this.categories[i].name).then( function(data) {
                obj.items = data;
            });
            console.log(obj.items);
            this.data.push(obj);
        }
    }
    
    open(data) {
        console.log(data);
    }
    
    isString(data) {
        console.log(data);
        return typeof data == "string"
    }
}
