import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'ion-news-box',
    templateUrl: 'posts.html'
})

// @View({
//     templateUrl: 'posts.html'
// })

export class NewsBox {
    constructor() {
        console.log("initialized");
    }
}
