import {App, Platform} from 'ionic-framework/ionic';
import {Page1} from './page1/page1';
import {News} from './news/news';
import {WatchList} from './watchlist/watchlist';


@App({
  templateUrl: 'app/app.html'
})
export class MyApp {
    tab1Root;
    tab2Root;
    tab3Root;
    
    constructor(platform: Platform) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = Page1;
        this.tab2Root = News;
        this.tab3Root = WatchList;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
