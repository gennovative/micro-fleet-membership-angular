export class TicketCombo {
	public id: number;
	public name: string;
	public price: number | string;
	public description: string;
	public codePrefix: string;
	public validFrom: Date;
	public validTo: Date;
	public isEnabled: boolean;
	public priceSettingId: number;
	public ticketsList: object[];

	constructor(ticketCombo?: any) {
		if (ticketCombo !== undefined) {
			this.clone(ticketCombo);
		}
	}

	public clone(ticketCombo: any) {
		this.id = ticketCombo.id === undefined ? this.id : ticketCombo.id;
		this.name = ticketCombo.name === undefined ? this.name : ticketCombo.name;
		this.price = ticketCombo.price === undefined ? this.price : ticketCombo.price;
		this.description = ticketCombo.description === undefined ? this.description : ticketCombo.description;
		this.codePrefix = ticketCombo.codePrefix === undefined ? this.codePrefix : ticketCombo.codePrefix;
		this.validFrom = ticketCombo.validFrom === undefined ? this.validFrom : ticketCombo.validFrom;
		this.validTo = ticketCombo.validTo === undefined ? this.validTo : ticketCombo.validTo;
		this.isEnabled = ticketCombo.isEnabled === undefined ? this.isEnabled : ticketCombo.isEnabled;
		this.ticketsList = ticketCombo.ticketsList === undefined ? this.ticketsList : ticketCombo.ticketsList;
	}
}
