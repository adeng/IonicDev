import {Http} from 'angular2/http';

export class XMLParser {
        
    constructor() {
    }
    
    getTags(dom: Element, tag: string) {
        return [].slice.call(dom.getElementsByTagName(tag));
    }
    
    parseRSS(xml: string) {
        // let doc = this.parser.parseFromString(xml, 'application/xml');
        // console.log(doc);
    }
    
    getRSS(http: Http, src: string, ticker: string) {
        var parser = new Promise<any>(function(resolve) {
            http.get(src).subscribe(
                data => {
                    let parser = new DOMParser();
                    let xml = data.text();
                    let doc = parser.parseFromString(xml, 'application/xml');
                    let posts = [].slice.call(doc.getElementsByTagName('item'));
                    
                    let arr = new Array<Object>();
                    for(let i = 0; i < posts.length; i++) {
                        let obj = new Object();
                        for(let j = 0; j < posts[i].children.length; j++) {
                            let content = posts[i].children[j].innerHTML;
                            switch(posts[i].children[j].nodeName) {
                                case "title":
                                    obj['title'] = content;
                                    break;
                                case "link":
                                    obj['link'] = content;
                                    break;
                                case "pubDate":
                                case "pubdate":
                                    obj['date'] = Date.parse(content);
                                    break;
                            }
                        }
                        obj['ticker'] = ticker;
                        arr.push(obj);
                    }
                    resolve(arr);
                },
                err => {
					http.get('/app/libs/data/aapl.xml').subscribe(
						res => {
                            let parser = new DOMParser();
                            let xml = res.text();
                            let doc = parser.parseFromString(xml, 'application/xml');
                            let posts = [].slice.call(doc.getElementsByTagName('item'));
                            
                            let arr = new Array<Object>();
                            for(let i = 0; i < posts.length; i++) {
                                let obj = new Object();
                                for(let j = 0; j < posts[i].children.length; j++) {
                                    let content = posts[i].children[j].innerHTML;
                                    switch(posts[i].children[j].nodeName) {
                                        case "title":
                                            obj['title'] = content;
                                            break;
                                        case "link":
                                            obj['link'] = content;
                                            break;
                                        case "pubDate":
                                        case "pubdate":
                                            obj['date'] = Date.parse(content);
                                            break;
                                    }
                                }
                                obj['ticker'] = ticker;
                                arr.push(obj);
                            }
                            resolve(arr);
						}
					);
				}
            );
        });
        return parser;
    }
}