import {Page} from 'ionic-framework/ionic';
import {XMLParser} from '../libs/services';
import {Http} from 'angular2/http';

@Page({
    templateUrl: 'app/postlist/postlist.html',
})
export class PostList {
    parser: XMLParser;
    objs: Array<Object>;
    
    // this should be passed in as an param or something in the future
    categories: Array<Object> = [{name: "News", url: "http://dailybruin.com/category/news/feed/"}, {name: "Sports", url: "http://dailybruin.com/category/sports/feed/"}, {name: "A&E", url: "http://dailybruin.com/category/arts-entertainment/feed/"}, {name: "Opinion", url: "http://dailybruin.com/category/opinion/feed/"}, {name: "Radio", url: "http://dailybruin.com/category/radio/feed/"}, {name: "Video", url: "http://dailybruin.com/category/video/feed/"}];
    
    constructor(http: Http) {
        this.parser = new XMLParser();
        this.objs = new Array<Array<Object>>();
        
        let nameArray = new Array();
        for(let i = 0; i < this.categories.length; i++) {
            this.objs[i] = new Array<Object>();
            nameArray.push(this.categories[i].name);
            this.parser.getRSS(http, this.categories[i].url, this.categories[i].name).then( data => {
                this.objs[nameArray.indexOf(data[0].category)] = data;
            });
        }
    }
}
