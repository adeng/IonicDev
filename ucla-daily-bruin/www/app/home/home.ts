import {Page} from 'ionic-framework/ionic';
import {XMLParser} from '../libs/services/xmlparser';
import {Http} from 'angular2/http';


@Page({
    templateUrl: 'app/home/home.html',
})
export class Home {
    parser: XMLParser;
    data;
    constructor(http: Http) {
        this.parser = new XMLParser();
        this.data = this.parser.getRSS(http, "http://dailybruin.com/feed", "All");
    }
}
