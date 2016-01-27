import {Page} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
    selected: number = 0;
    question: string;
    choices: Array<string> = [];
    constructor(http: Http) {
        http.get('/build/data.json').subscribe( result => {
            let data = result.json();
            this.question = data.question;
            this.choices = data.choices;
        });
    }
    
    show() {
        alert(this.selected);
    }
    
    select(option: number) {
        this.selected = option;
        console.log(this.selected);
    }
}
