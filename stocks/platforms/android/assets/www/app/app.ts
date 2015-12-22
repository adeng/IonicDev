import {App, Platform} from 'ionic-framework/ionic';
import {Earnings} from './earnings/earnings';
import {News} from './news/news';
import {WatchList} from './watchlist/watchlist';


@App({
  templateUrl: 'app/app.html'
})
export class MyApp {
    tab1Root;
    tab2Root;
    tab3Root;
    tab4Root;
    
    constructor(platform: Platform) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = News;
        this.tab2Root = Earnings;
        this.tab3Root = WatchList;
        this.tab4Root = News;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
