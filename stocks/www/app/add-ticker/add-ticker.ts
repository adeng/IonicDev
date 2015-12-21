import {Page, Storage, SqlStorage, Popup, NavController} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
  templateUrl: 'app/add-ticker/add-ticker.html',
})
export class AddTicker {
    ticker: Control = new Control('');
    cat: Control = new Control('');
    tickerForm: ControlGroup = new ControlGroup({
    "ticker": this.ticker,
    "cat": this.cat
    });

    storage: Storage;
    popup: Popup;

    constructor(popup: Popup, nav: NavController) {
        this.storage = new Storage(SqlStorage, {name: 'stocks'});
        this.popup = popup;
        this.nav = nav;
    }
  
    processInput() {
        /* this.storage.query('CREATE TABLE IF NOT EXISTS ? (ticker varchar(10))', [this.cat.value]).then(() => {
        this.storage.query('INSERT INTO ? (ticker) VALUES (?)', [this.cat.value, this.ticker.value]).then(() => {
            console.log("Stored " + this.ticker.value + " in " + this.cat.value);
        })
        }); */
    
        this.storage.get(this.cat.value).then((value) => {
            if( value == null ) {
                this.storage.set(this.cat.value, this.ticker.value);
                this.nav.pop();
                return;
            }
            
            let tv = value.split(",");
            if( tv.indexOf(this.ticker.value) != -1 ) {
                this.popup.alert({
                    title: "Error!",
                    template: "This ticker has already been added to your watchlist!"
                });
                this.nav.pop();
                return;
            }
            
            tv.push(this.ticker.value);
            let v = tv.join(",");
            this.storage.set(this.cat.value, v);
            this.nav.pop();      
        });
    }
}
