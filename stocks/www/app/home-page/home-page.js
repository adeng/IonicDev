import {Page, NavController} from 'ionic/ionic';

@Page({
  templateUrl: 'app/home-page/home-page.html'
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
