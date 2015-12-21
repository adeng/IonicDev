import {Modal, Page, NavParams} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'app/modals/filter-modal.html'
})

export class FilterModal {
    tags: Array<Object> = new Array();
    constructor(nav: NavParams) {
        this.tags = nav.get('tags');
        console.log(this.tags);
    }

    closePage() {
        this.close(this.tags);
    }
}