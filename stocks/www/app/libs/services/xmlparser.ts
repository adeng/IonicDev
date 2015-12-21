import {Http} from 'angular2/http';

export class XMLParser {
    parser: DOMParser;
    http: Http;
    
    constructor(http: Http) {
        this.parser = new DOMParser()
        this.http = http;
    }
    
    getTags(dom: Element, tag: string) {
        return [].slice.call(dom.getElementsByTagName(tag));
    }
    
    getRSS(src: string) {
        return new Promise<Array<Object>>(function(resolve) {
            this.http.get(src).subscribe(
                data => {
                    console.log(data);
                }
            );
        });
    }
}