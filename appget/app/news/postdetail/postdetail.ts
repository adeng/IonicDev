import {Page, NavParams, NavController, Slides, Storage, SqlStorage, Alert} from 'ionic-framework/ionic';
import {Favorite} from '../../libs/services';

@Page({
    templateUrl: 'build/news/postdetail/postdetail.html'
})
export class PostDetail {
    posts: Array<Object>;
    index: number;
    title: string;
    nav: NavController;
    fav: Favorite = new Favorite();
    constructor(navParams: NavParams, nav: NavController) {
        this.posts = navParams.get('posts');
        this.index = navParams.get('index');
        this.nav = nav;
        this.storage = new Storage(SqlStorage, {name: "favorites"});
        this.title = this.posts[this.index].title;
    }
    
    updateSlide(event) {
        this.title = this.posts[event.activeIndex].title;
        this.index = event.activeIndex;
    }
    
    favorite() {
        let alert = Alert.create({
            title: "Favorite",
            body: "Do you want to add this story to your favorites?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => { }
                },
                {
                    text: 'OK',
                    handler: () => { 
                        this.storage.get('favorites').then( data => {
                            let a = (data == null) ? new Array() : JSON.parse(data);
                            a.push(this.posts[this.index]);
                            this.storage.set('favorites', JSON.stringify(a));
                        });
                    }
                }
            ]
        });
        this.nav.present(alert);
    }
    
    share() {
        
    }
}
