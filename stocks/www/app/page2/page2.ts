import {Page} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
  templateUrl: 'app/page2/page2.html',
})
export class Page2 {
  ticker: Control = new Control('');
  cat: Control = new Control('');
  tickerForm: ControlGroup = new ControlGroup({
    "ticker": this.ticker,
    "cat": this.cat
  });
  
  constructor() {
  }
  
  processInput() {
    console.log(JSON.stringify(this.tickerForm.value));
  }
}
