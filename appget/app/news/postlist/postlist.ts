import {Page, Modal, NavController, NavParams} from 'ionic-framework/ionic';
import {FilterModal} from '../modals/modals';
import {XMLParser} from '../../libs/services';
import {Http} from 'angular2/http';

import {PostDetail} from '../postdetail/postdetail';

@Page({
    templateUrl: 'build/news/postlist/postlist.html',
})
export class PostList {
    parser: XMLParser;
    objs: Array<Object>;
    modal: Modal;
    categories: Array<Object>;
    nav: NavController;
    
    constructor(http: Http, modal: Modal, nav: NavController, navParams: NavParams) {
        this.nav = nav;
        this.modal = modal;
        this.categories = navParams.get("params");
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
