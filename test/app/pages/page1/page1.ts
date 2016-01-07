import {Page, Popup, NavController} from 'ionic-framework/ionic';
import {Page2} from '../page2/page2';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  
  displayer: Popup;
  nav: NavController;
  
  constructor(popup: Popup, nav: NavController) {
      this.displayer = popup;
      this.nav = nav;
  }
  
  openPopup() {
    this.displayer.alert({
        title: "New Friend!",
        template: "Your friend, Obi wan Kenobi, just accepted your friend request!",
        cssClass: 'my-alert'
    }).then(() => {
        console.log('Alert closed');
    });
  }
  
  openPage() {
      this.nav.push(Page2);
  }
}
