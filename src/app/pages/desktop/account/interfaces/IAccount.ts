import { Role } from '../models/role';

export interface IAccount {
	id: number;
	username: string;
	password?: string;
	fullname?: string;
	role: Role;
	createdAt?: Date; // date of the user created
	status?: string;
}
