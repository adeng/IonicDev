import {Page} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'app/page3/page3.html'
})
export class Page3 {
  display: string = "have";
  constructor() {

  }
  
  fillList(display: string) {
    console.log(display);
  }
}
