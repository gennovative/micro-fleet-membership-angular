export class Souvenir {
	public id: number;
	public kiosk_name: string;
	public asset_link: string;
	public printout_id: number;

	constructor(souvenir?: any) {
		this.id = (souvenir.id === undefined) ? null : souvenir.id;
		this.kiosk_name = (souvenir.kiosk_name === undefined) ? '' : souvenir.kiosk_name;
		this.asset_link = (souvenir.asset_link === undefined) ? '' : souvenir.asset_link;
		this.printout_id = (souvenir.printout_id === undefined) ? null : souvenir.printout_id;
	}
}
