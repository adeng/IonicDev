import {Http} from 'angular2/http';
import {Storage, SqlStorage} from 'ionic-framework/ionic';

export class XMLParser {
    parser;
    
    constructor() {
        this.parser = new DOMParser();
    }
    
    getTags(dom: Element, tag: string) {
        return [].slice.call(dom.getElementsByTagName(tag));
    }
    
    getRSS(http: Http, src: string, category: string) {
        let a = this;
        return new Promise<any>(function(resolve) {
            http.get(src).subscribe(
                data => {
                    let arr = a.processRSS(data.text(), category);
                    resolve(arr);
                },
                err => {
					http.get('/app/libs/data/sample-rss.xml').subscribe(
						res => {
                            let arr = a.processRSS(res.text(), category);
                            resolve(arr);
						}
					);
				}
            );
        });
    }
    
    parseRSS(xml: string, tag: string) {
        let doc = this.parser.parseFromString(xml, 'application/xml');
        return [].slice.call(doc.getElementsByTagName(tag));
    }
    
    /**
     * Finds all image and video links given a HTML string.
     * 
     * @author: Richard Sun
     */
    processNodeMedia(html: string) {
        var doc = this.parser.parseFromString(html, 'text/html'); 
		var images = this.getTags(doc, 'img'); 
 		var videos = this.getTags(doc, 'video').concat(this.getTags(doc, 'iframe')); 
        
 		return { 
 			images: images.map(function(img) { 
 				return img.getAttribute('src'); 
 			}), 
 			videos: videos.map(function(vid) { 
 				return vid.getAttribute('src'); 
 			}) 
 		}; 

    }
    
    processCData(str: string) {
        if( str.indexOf('<![CDATA[') == 0 )
            return str.substring(9, str.length - 3);
        else
            return str;
    }
    
    processRSS(xml: string, category: string) {
        let posts = this.parseRSS(xml, 'item');        
        let arr = new Array<Object>();
        
        for(let i = 0; i < posts.length; i++) {
            let obj = new Object();
            let tags = new Array();
            for(let j = 0; j < posts[i].children.length; j++) {
                let content = posts[i].children[j].innerHTML;
                switch(posts[i].children[j].nodeName.toLowerCase()) {
                    case "title":
                        obj['title'] = this.processCData(content);
                        break;
                    case "link":
                        obj['link'] = content;
                        break;
                    case "dc:creator":
                        obj['author'] = this.processCData(content);
                        break;
                    case "pubdate":
                        obj['date'] = Date.parse(content);
                        break;
                    case "description":
                    case "content:encoded":
                        obj['media'] = this.processNodeMedia(content.substring(9, content.length - 3));
                        obj['htmlcontent'] = this.processCData(content);
                        break;
                    case "category":
                        tags.push(this.processCData(content));
                        break;
                }
            }
            obj['tags'] = tags;
            obj['category'] = category;
            arr.push(obj);
        }
        
        return arr;
    }
}

export class GoogleFormRequest {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    
    getToken(http: Http, rt: string, cID: string, scope: string) {
        http.get("https://accounts.google.com/o/oauth2/v2/auth" + "?scope=" + encodeURIComponent(scope) + "&response_type=" + encodeURIComponent(rt) + "&client_id=" + encodeURIComponent(cID) + "&nonce=17").subscribe( data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
    
    executeFunction(http: Http, func: string, params: Array<any>) {
        let obj = {
            "function": func,
            "parameters": params,
            "sessionState": "",
            "devMode": true
        };
        
        http.post("https://script.googleapis.com/v1/scripts/" + this.id + ":run", JSON.stringify(obj)).subscribe( data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
}

export class Favorite {
    storage: Storage;
    constructor() {
        this.storage = new Storage(SqlStorage, {name: "favorites"});
    }
    
    addFavorite(popup, obj) {
        popup.confirm({
            title: "Favorite",
            template: "Do you want to add this story to your favorites?",
            cancelText: "Cancel",
            okText: "OK"
        }).then((result, ev) => {
            this.storage.get('favorites').then( data => {
                let a = (data == null) ? new Array() : JSON.parse(data);
                a.push(obj);
                this.storage.set('favorites', JSON.stringify(a));
            });
        }, () => {
            console.log("Cancelled");
        });
    }
}