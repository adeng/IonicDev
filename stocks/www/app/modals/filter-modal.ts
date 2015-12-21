import {Modal, Page, NavParams} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'app/modals/filter-modal.html'
})

export class FilterModal {
    tickers: Array<string> = new Array();
    constructor(nav: NavParams) {
        this.tickers = nav.get('tickers');
    }

    closePage() {
        this.close(this.tickers);
    }
}