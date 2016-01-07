import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {Home} from './home/home';
import {PostList} from './news/postlist/postlist';
import {Favorites} from './news/favorites/favorites';


@App({
  templateUrl: 'build/app.html'
})
export class MyApp {
    root;
    pages;
    constructor(private app: IonicApp, private platform: Platform, private http: Http) {
        this.app = app;
        
        // Use type as index and the actual channel component in the obj
        let channelObj = {
            "home": Home,
            "postlist": PostList,
            "favorites": Favorites
        };
        
        http.get("/build/app.json").subscribe( res => {
            let data = res.json();
            let channels = data.channels;
            for(let i = 0; i < channels.length; i++) {
                channels[i].component = channelObj[channels[i].type];
            }
            
            this.pages = channels;
            
            // this tells the tabs component which Pages
            // should be each tab's root Page
            this.root = this.pages[0].component;
            
            platform.ready().then(() => {
                // Do any necessary cordova or native calls here now that the platform is ready
                this.openPage(this.pages[0]);
            });
        });
    }
    
    openPage(page) {
        // find the nav component and set what the root page should be
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        // console.log(page.component);
        nav.setRoot(page.component, {params: page.params}).then(() => {
            // wait for the root page to be completely loaded
            // then close the menu
            this.app.getComponent('leftMenu').close();
        });
    }
}
