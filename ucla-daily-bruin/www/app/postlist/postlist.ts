import {Page, Modal, NavController} from 'ionic-framework/ionic';
import {FilterModal} from '../modals/modals';
import {XMLParser} from '../libs/services';
import {Http} from 'angular2/http';

import {PostDetail} from '../postdetail/postdetail';

@Page({
    templateUrl: 'app/postlist/postlist.html',
})
export class PostList {
    parser: XMLParser;
    objs: Array<Object>;
    modal: Modal;
    nav: NavController;
    
    // this should be passed in as an param or something in the future
    categories: Array<Object> = [{name: "News", show: true, url: "http://dailybruin.com/category/news/feed/"}, {name: "Sports", show: true, url: "http://dailybruin.com/category/sports/feed/"}, {name: "A&E", show: true, url: "http://dailybruin.com/category/arts-entertainment/feed/"}, {name: "Opinion", show: true, url: "http://dailybruin.com/category/opinion/feed/"}, {name: "Radio", show: true, url: "http://dailybruin.com/category/radio/feed/"}, {name: "Video", show: true, url: "http://dailybruin.com/category/video/feed/"}];
    
    constructor(http: Http, modal: Modal, nav: NavController) {
        this.nav = nav;
        this.modal = modal;
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
    
    openFilter() {
        this.modal.open(FilterModal, {tags: this.categories});
    }
    
    openPost(posts: Array<Object>, index: number) {
        this.nav.push(PostDetail, {posts: posts, index: index});
    }
}
