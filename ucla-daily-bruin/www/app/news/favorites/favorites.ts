import {Page, Storage, SqlStorage, Modal} from 'ionic-framework/ionic';
import {StoryModal} from '../modals/modals';

@Page({
    templateUrl: 'app/news/favorites/favorites.html'
})
export class Favorites {
    storage: Storage;
    favorites: Array<Object>;
    modal: Modal;
    
    constructor(modal: Modal) {
        this.modal = modal;
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
        console.log(this.favorites[index]);
        this.modal.open(StoryModal, {story: this.favorites[index]});
    }
}
