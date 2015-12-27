import {Page, NavParams, Slides, Storage, SqlStorage, Popup} from 'ionic-framework/ionic';
import {Favorite} from '../../libs/services';

@Page({
    templateUrl: 'app/news/postdetail/postdetail.html'
})
export class PostDetail {
    posts: Array<Object>;
    index: number;
    title: string;
    popup: Popup;
    fav: Favorite;
    constructor(navParams: NavParams, popup: Popup) {
        this.posts = navParams.get('posts');
        this.fav = new Favorite();
        this.storage = new Storage(SqlStorage, {name: 'favorites'});
        this.index = navParams.get('index');
        this.title = this.posts[this.index].title;
        this.popup = popup;
    }
    
    updateSlide(event) {
        this.title = this.posts[event.activeIndex].title;
        this.index = event.activeIndex;
    }
    
    favorite() {
        this.fav.addFavorite(this.popup, this.posts[this.index]);
    }
    
    share() {
        
    }
}
