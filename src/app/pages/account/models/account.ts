import { Role } from './role';

export class Account {
	public id: number;
	public username: string;
	public password: string;
	public fullname: string;
	public role: Role | string;
	public date: Date; // date of the user created
	public isEnabled: boolean | string;
}
