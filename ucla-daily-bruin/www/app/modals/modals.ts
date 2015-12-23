import {Modal, Page, NavParams} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'app/modals/filter-modal.html'
})

export class FilterModal {
    tags: Array<Object> = new Array();
    constructor(nav: NavParams) {
        this.tags = nav.get('tags');
    }
}

@Page({
    templateUrl: 'app/modals/story-modal.html'
})

export class StoryModal {
    story: Object;
    constructor(nav: NavParams) {
        this.story = nav.get('story');
    }
}


