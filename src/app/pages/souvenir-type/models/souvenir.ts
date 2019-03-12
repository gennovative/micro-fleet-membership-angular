export class SouvenirType {
	public id: number;
	public name: string;
	public price: number;
	public is_enabled: boolean | string;

	constructor(souvenirType?: any) {
		this.id = (souvenirType.id === undefined) ? null : souvenirType.id;
		this.name = (souvenirType.name === undefined) ? '' : souvenirType.name;
		this.price = (souvenirType.price === undefined) ? null : souvenirType.price;
		this.is_enabled = (souvenirType.is_enabled === undefined) ? true : souvenirType.is_enabled;
	}
}
