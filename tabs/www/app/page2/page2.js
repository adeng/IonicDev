import {Page} from 'ionic/ionic';
import {Stock} from '../libs/stocks';

@Page({
  templateUrl: 'app/page2/page2.html',
})
export class Page2 {
  constructor() {
    let as = new Stock("MSFT");
    console.log(as.getTicker());
  }
  
  processInput() {
    alert("Clicked");
  }
}
