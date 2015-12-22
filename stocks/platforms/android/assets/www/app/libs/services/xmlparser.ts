import {Http} from 'angular2/http';

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
					http.get('/app/libs/data/aapl.xml').subscribe(
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
    processNode(html: string) {
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
                        obj['title'] = content;
                        break;
                    case "link":
                        obj['link'] = content;
                        break;
                    case "pubdate":
                        obj['date'] = Date.parse(content);
                        break;
                    case "description":
                    case "content:encoded":
                        obj['media'] = this.processNode(content.substring(9, content.length - 3));
                        obj['htmlcontent'] = content.substring(9, content.length - 3);
                        break;
                    case "category":
                        tags.push(content);
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