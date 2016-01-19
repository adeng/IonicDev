import {Page, NavParams, ViewController} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'build/news/modals/filter-modal.html'
})

export class FilterModal {
    tags: Array<Object> = new Array();
    view: ViewController;
    constructor(nav: NavParams, view: ViewController) {
        this.tags = nav.get('tags');
        this.view = view;
    }
    
    dismiss() {
        this.view.dismiss();
    }
}

@Page({
    templateUrl: 'build/news/modals/story-modal.html'
})

export class StoryModal {
    story: Object;
    view: ViewController;
    constructor(nav: NavParams, view: ViewController) {
        this.story = nav.get('story');
        this.view = view;
    }
    
    dismiss() {
        this.view.dismiss();
    }
}


