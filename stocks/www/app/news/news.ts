import {Page, Storage, SqlStorage, Popup} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {XMLParser} from '../libs/services/xmlparser';

@Page({
  templateUrl: 'app/news/news.html',
})
export class News {
    constructor(http: Http) {
        
    }
}
