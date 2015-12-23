import {Page, NavParams, Slides} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'app/postdetail/postdetail.html'
})
export class PostDetail {
    posts: Array<Object>;
    start: number;
    constructor(navParams: NavParams) {
        this.posts = navParams.get('posts');
        this.start = navParams.get('index');
    }
    
    updateSlide(evt) {
        console.log(evt);
    }
}
