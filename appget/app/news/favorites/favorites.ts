import {Page, Storage, NavController, SqlStorage, Modal} from 'ionic-framework/ionic';
import {StoryModal} from '../modals/modals';

@Page({
    templateUrl: 'build/news/favorites/favorites.html'
})
export class Favorites {
    storage: Storage;
    favorites: Array<Object>;
    nav: NavController;
    
    constructor(nav: NavController) {
        console.log("Initialized");
        this.nav = nav;
        this.storage = new Storage(SqlStorage, {name: 'favorites'});
        this.favorites = new Array<Object>();
        this.storage.get('favorites').then( data => {
            if(data != null) 
                this.favorites = JSON.parse(data);
        });
    }
    
    removeItem(index: number) {
        this.favorites.splice(index, 1);
        this.storage.set('favorites', JSON.stringify(this.favorites));
    }
    
    openPost(index: number) {
        let story = Modal.create(StoryModal, {story: this.favorites[index]});
        this.nav.present(story);
    }
}
