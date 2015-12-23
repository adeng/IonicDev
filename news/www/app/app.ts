import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {Home} from './home/home';
import {Headlines} from './headlines/headlines';
import {PostList} from './postlist/postlist';
import {Page3} from './page3/page3';


@App({
  templateUrl: 'app/app.html'
})
export class MyApp {
    root;
    pages;
    constructor(private app: IonicApp, private platform: Platform) {
        this.app = app;
        // // set our app's pages
        this.pages = [
            { title: 'Home', component: Home, icon: "home" },
            { title: 'Headlines', component: Headlines, icon: "document" },
            { title: 'Post List', component: PostList, icon: "list"}
        ];

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.root = Home;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
    
    openPage(page) {
        // find the nav component and set what the root page should be
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component).then(() => {
            // wait for the root page to be completely loaded
            // then close the menu
            this.app.getComponent('leftMenu').close();
        });
    }
}
