export class Stock {
	ticker: string;
	constructor(ticker: string) {
		this.ticker = ticker;
	}
	
	getTicker() {
		return this.ticker;
	}
}