import {Page, Storage, SqlStorage} from 'ionic-framework/ionic';
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
  
  storage: Storage;
  
  constructor() {
    this.storage = new Storage(SqlStorage);
  }
  
  processInput() {
    this.storage.get(this.cat.value).then((value) => {
      this.storage.set(this.cat.value, value + "," + this.ticker.value);
    });
  }
}
