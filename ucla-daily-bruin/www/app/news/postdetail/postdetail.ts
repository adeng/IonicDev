import {Page, NavParams, Slides, Storage, SqlStorage, Popup} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'app/news/postdetail/postdetail.html'
})
export class PostDetail {
    posts: Array<Object>;
    index: number;
    title: string;
    popup: Popup;
    constructor(navParams: NavParams, popup: Popup) {
        this.posts = navParams.get('posts');
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
        this.popup.confirm({
            title: "Favorite",
            template: "Do you want to add this story to your favorites?",
            cancelText: "Cancel",
            okText: "OK"
        }).then((result, ev) => {
            this.storage.get('favorites').then( data => {
                let a = (data == null) ? new Array() : JSON.parse(data);
                a.push(this.posts[this.index]);
                this.storage.set('favorites', JSON.stringify(a));
            });
        }, () => {
            console.log("Cancelled");
        });
    }
    
    share() {
        
    }
}
