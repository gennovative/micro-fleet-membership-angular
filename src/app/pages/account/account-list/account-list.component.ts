import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { VMTable } from '../../view-models/vm-table';
import { ColumnTable } from '../../data-types/column-table';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'ggm-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
			{ field: 'id', header: '', display: 'none' },
			{ field: 'username', header: 'Username', display: 'table-cell', hasLink: true },
			{ field: 'fullname', header: 'Full Name', display: 'table-cell', hasLink: false },
			{ field: 'createdAt', header: 'Created At', display: 'table-cell', hasLink: false },
			{ field: 'status', header: 'Status', display: 'table-cell', hasLink: false },
		];
	public idField: string = 'id';

	constructor(
		private accService: AccountService,
		private _confirmService: ConfirmationService,
	) {
		super(accService, _confirmService);
	}

	public ngOnInit() {
	}
}
