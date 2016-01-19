import {Page, Storage, SqlStorage, Modal} from 'ionic-framework/ionic';
import {StoryModal} from '../modals/modals';

@Page({
    templateUrl: 'build/news/favorites/favorites.html'
})
export class Favorites {
    storage: Storage;
    favorites: Array<Object>;
    // modal: Modal;
    
    constructor() {
        console.log("Initialized");
        // this.modal = modal;
        // this.storage = new Storage(SqlStorage, {name: 'favorites'});
        this.favorites = new Array<Object>();
        // this.storage.get('favorites').then( data => {
        //     if(data != null) 
        //         this.favorites = JSON.parse(data);
        // });
    }
    
    removeItem(index: number) {
        let a = this.favorites.splice(index, 1);
        this.storage.set('favorites', JSON.stringify(a));
    }
    
    openPost(index: number) {
        console.log(this.favorites[index]);
        Modal.create(StoryModal, {story: this.favorites[index]});
    }
}
