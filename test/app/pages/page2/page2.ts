import {Page, NavParams} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
  public content: string = "Hello World";
  constructor(nav: NavParams) {
      this.content = nav.get('key');
  }
}
