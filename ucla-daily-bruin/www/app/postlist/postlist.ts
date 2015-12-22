import {Page} from 'ionic-framework/ionic';
import {XMLParser} from '../libs/services';

@Page({
    templateUrl: 'app/postlist/postlist.html',
})
export class PostList {
    parser: XMLParser;
    objs: Array<Object>;
    
    // this should be passed in as an param or something in the future
    src: Object = {name: "News", url: "http://dailybruin.com/category/news/feed/"};
    
    constructor(http: Http) {
        this.parser = new XMLParser();
        this.objs = new Array<Object>();
        this.parser.getRSS(http, this.src.url, this.src.name).then( data => {
            this.objs = data;
        });
    }
}
