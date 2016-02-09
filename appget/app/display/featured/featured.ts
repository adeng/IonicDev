import {Page, Modal, NavController, NavParams} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Page({
    templateUrl: 'build/display/featured/featured.html',
})
export class Featured {
    title: string;
    data: string;
    archive;
    nav: NavController;
    constructor(http: Http, nav: NavController, navParams: NavParams) {
        this.nav = nav;
        this.archive = navParams.get("params");
        let a = navParams.get("nav") == undefined ? "main" : navParams.get("nav");
        
        this.data = this.archive[a]; 
    }
    
    navigate(id) {
        this.nav.push(Featured, {nav: id, params: this.archive});
    }
}