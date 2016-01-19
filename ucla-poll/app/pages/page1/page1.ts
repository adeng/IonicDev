import {Page} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {XMLParser, GoogleFormRequest} from '../../libs/services';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
    gfr: GoogleFormRequest = new GoogleFormRequest("M31U-o4_NcdoAGSF4MumOyT8Rq9Cotphv");
    CLIENT_ID: string = "910699492833-ugr9oppphph1k1oeboir876cindjpvfg.apps.googleusercontent.com";
    SCOPES: Array<string> = ['https://www.googleapis.com/auth/spreadsheets'];
    constructor(http: Http) {
        this.gfr.getToken(http, "token", "910699492833-ihjup1fi0oiv73eelvvfluej9cteakbk.apps.googleusercontent.com", "https://www.googleapis.com/auth/spreadsheets");
        this.gfr.executeFunction(http, "getQuestionObject", []);
    }
}
