import {Modal, Page, NavParams} from 'ionic-framework/ionic';

@Page({
    templateUrl: 'app/modals/news-modal.html'
})

export class NewsModal {  
  constructor(nav: NavParams) {
      this.url = nav.get('url');
      this.title = nav.get('title')
  }
}