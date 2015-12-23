import {Page, Storage, SqlStorage} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'app/favorites/favorites.html'
})
export class Favorites {
    storage: Storage;
    favorites: Array<Object>;
    constructor() {
        this.storage = new Storage(SqlStorage, {name: 'favorites'});
        this.favorites = new Array<Object>();
        this.storage.get('favorites').then( data => {
            if(data != null) 
                this.favorites = JSON.parse(data);
        });
    }
    
    removeItem(index: number) {
        let a = this.favorites.splice(index, 1);
        this.storage.set('favorites', JSON.stringify(a));
    }
}
