import {Page, Storage, SqlStorage} from 'ionic-framework/ionic';
import {NgFor} from 'angular2/angular2';

@Page({
  templateUrl: 'app/page3/page3.html'
})
export class Page3 {
  tickers: Array<string>;
  constructor() {
    this.storage = new Storage(SqlStorage, {name: 'stocks'});
    this.fillList('have');
  }
  
  fillList(display: string) {
    this.storage.get(display).then((values) => {
      if( values == null ) {
        this.tickers = ["You haven't added any tickers yet!"];
      } else {
        this.tickers = values.split(",");  
      }
    });
  }
}
