import { Component, OnInit } from '@angular/core';
import { VMTable } from '@@core/view-models/vm-table';
import { ColumnTable } from '../../../data-types/column-table';
import { ConfirmationService } from 'primeng/api';
import { RoleService } from '@@core/services/role.service';

@Component({
	selector: 'ggm-roles-list',
	templateUrl: './roles-list.component.html',
	styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'id', header: '', display: 'none' },
		{ field: 'name', header: 'Name', display: 'table-cell', hasLink: true },
		{ field: 'membersCount', header: 'Members count', display: 'table-cell'},
	];
	protected idField: string = 'id';
	protected membersCountField: string = 'membersCount';

	constructor(
		private _roleService: RoleService,
		private _confirmService: ConfirmationService,
	) {
		super(_roleService, _confirmService);
	}

	public isDeleteEnabled(membersCount: number): boolean {
		return Boolean(membersCount === 0);
	}

	public ngOnInit() {
	}
}
