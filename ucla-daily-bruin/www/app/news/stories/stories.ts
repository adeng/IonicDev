import {Page, NavParams, NavController, Popup, Modal} from 'ionic-framework/ionic';
import {PostDetail} from '../postdetail/postdetail';
import {Http} from 'angular2/http';
import {XMLParser, Favorite} from '../../libs/services';

@Page({
    templateUrl: 'app/news/stories/stories.html'
})
export class Stories {
    storage: Storage;
    stories: Array<Object>;
    modal: Modal;
    nav: NavController;
    fav: Favorite;
    
    constructor(modal: Modal, nav: NavController, popup: Popup, navParams: NavParams, http: Http) {
        this.modal = modal;
        this.popup = popup;
        this.nav = nav;
        this.fav = new Favorite();
        this.parser = new XMLParser();
        this.stories = new Array<Object>();
        this.parser.getRSS(http, navParams.get('url'), navParams.get('name')).then( data => {
            this.stories = data;
            console.log(data);
        });
    }
    
    openPost(index: number) {
        this.nav.push(PostDetail, {posts: this.stories, index: index});
    }
    
    favorite(index: number) {
        this.fav.addFavorite(this.popup, this.stories[index]);
    }
    
    share(index: number) {
        
    }
}
