export class Stock {
	ticker: string;
	name: string;
	constructor(private ticker: string) {
		this.ticker = ticker;
	}
	
	getName() {
		return this.name;
	}
	
	getTicker() {
		return this.ticker;
	}
}