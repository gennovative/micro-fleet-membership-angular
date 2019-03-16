export class Ticket {
	public id: number;
	public name: string;
	public price: number | string;
	public description: string;
	public codePrefix: string;
	public isEnabled: boolean;
	public priceSettingId: number;

	constructor(ticket?: any) {
		if (ticket !== undefined) {
			this.clone(ticket);
		}
	}

	public clone(ticket: any) {
		this.id = ticket.id === undefined ? this.id : ticket.id;
		this.name = ticket.name === undefined ? this.name : ticket.name;
		this.price = ticket.price === undefined ? this.price : ticket.price;
		this.description = ticket.description === undefined ? this.description : ticket.description;
		this.codePrefix = ticket.codePrefix === undefined ? this.codePrefix : ticket.codePrefix;
		this.isEnabled = ticket.isEnabled === undefined ? this.isEnabled : ticket.isEnabled;
		this.priceSettingId = ticket.priceSettingId === undefined ? this.priceSettingId : ticket.priceSettingId;
	}
}
