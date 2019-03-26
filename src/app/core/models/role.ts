export enum RoleId {
	ADMIN = '6374547386693320704',
}

export enum RoleName {
	ADMIN = 'admin',
	SYS_ADMIN = 'System admin', // have full permission
	MANAGER = 'Manager', // only have permission on the ticket function
}

export class Role {
	public id: string;
	public name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
